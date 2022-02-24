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
        this.difficulty = 2;
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

    minePendingTransactions(miningRewardAddress: string): void {
        const rewardTransaction = new Transaction('', miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTransaction);

        const block = new Block(new Date(), this.pendingTransactions, this.getLatestBlock().getHash);
        block.mineBlock(this.difficulty);

        console.log(`new block mined: ${JSON.stringify(block, null, 2)}`);
        this.chain.push(block);
        this.pendingTransactions = [];
    }

    addTransaction(transaction: Transaction) {
        if(!transaction.getFromAddress || !transaction.getToAddress) {
            throw new Error('Transaction must include from and to address');
        }

        if(!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to the block');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address: string): number {
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

    isChainValid(): boolean {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(!currentBlock.hasValidTransactions()) {
                return false
            }

            if(currentBlock.getHash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.getPreviousHash !== previousBlock.getHash) {
                return false;
            }
        }
        return true;
    }
}