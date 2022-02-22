const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesysBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesysBlock() {
        return new Block(new Date(), [], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        const rewardTransaction = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTransaction);

        const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        
        console.log(`new block mined: ${JSON.stringify(block, null, 2)}`);
        this.chain.push(block);
        this.pendingTransactions = [];
    }

    addTransaction(transaction) {

        if(!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to Address');
        }

        if(!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to the block');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for(const block of this.chain) {
            for(const trans of block.data) {
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(!currentBlock.hasValidTransactions()) {
                return false;
            }

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;