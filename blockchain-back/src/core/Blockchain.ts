import Block from "../model/Block";
import Transaction from "../model/Transaction";

export default class Blockchain {
    private static instance: Blockchain;

    private chain: Block[];
    private difficulty: number;
    private pendingTransactions: Transaction[];
    private miningReward: number;

    private constructor() {
        this.chain = [this.createGenesysBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    public static getIstance() {
        if(!Blockchain.instance) {
            this.instance = new Blockchain();
        }

        return this.instance;
    }

    private createGenesysBlock(): Block {
        return new Block(new Date(), [], '0');
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    async minePendingTransactions(miningRewardAddress: string): Promise<void> {
        const rewardTransaction = new Transaction('', miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTransaction);

        const block = new Block(new Date(), this.pendingTransactions, this.getLatestBlock().getHash);
        block.mineBlock(this.difficulty);

        console.log(`new block mined: ${JSON.stringify(block, null, 2)}`);
        this.chain.push(block);
        this.pendingTransactions = [];
    }

    async addTransaction(transaction: Transaction) {
        if(!transaction.getFromAddress || !transaction.getToAddress) {
            throw new Error('Transaction must include from and to address');
        }

        if(!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to the block');
        }

        if(transaction.getAmount <= 0) {
            throw new Error('Transaction amount should be higher than 0');
        }

        const walletBalance = await this.getBalanceOfAddress(transaction.getFromAddress);
        if(walletBalance < transaction.getAmount) {
            throw new Error('Not enough balance.');
        }

        const pendingTxForWallet = this.pendingTransactions
            .filter(tx => tx.getFromAddress === transaction.getFromAddress);

        if(pendingTxForWallet.length > 0) {
            const totalPendingAmount = pendingTxForWallet
                .map(tx => tx.getAmount)
                .reduce((prev, curr) => prev + curr);

            const totalAmount = totalPendingAmount + transaction.getAmount;
            if(totalAmount > walletBalance) {
                throw new Error('Pending transactions for thiis wallet is higher than its balance.');
            }
        }

        this.pendingTransactions.push(transaction);
    }

    async getBalanceOfAddress(address: string): Promise<number> {
        let balance = 0;
        for(const block of this.chain) {
            for(const tr of block.getData) {
                if(tr.getFromAddress === address) {
                    balance -= tr.getAmount;
                }

                if(tr.getToAddress === address) {
                    balance += tr.getAmount;
                }
            }
        }

        return balance;
    }

    getAllTransactionsForWallet(address: string): Transaction[] {
        const txs: Transaction[] = [];

        for(const block of this.chain) {
            for(const tx of block.getData) {
                if(tx.getFromAddress === address || tx.getToAddress === address) {
                    txs.push(tx);
                }
            }
        }

        return txs;
    }

    isChainValid(): boolean {

        const realGenesis = JSON.stringify(this.createGenesysBlock());

        if(realGenesis !== JSON.stringify(this.chain[0])) return false;

        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.getPreviousHash !== previousBlock.getHash) {
                return false;
            }

            if(!currentBlock.hasValidTransactions()) {
                return false
            }

            if(currentBlock.getHash !== currentBlock.calculateHash()) {
                return false;
            }
        }
        return true;
    }
}