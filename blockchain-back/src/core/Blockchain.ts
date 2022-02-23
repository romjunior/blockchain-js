import Block from "../model/Block";
import Transaction from "../model/Transaction";

export default class Blockchain {
    private chain: Block[];
    private difficulty: number;
    private pendingTransactions: Transaction[];
    private miningReward: number;
    constructor() {
        this.chain = [this.createGenesysBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    private createGenesysBlock(): Block {
        return new Block(new Date(), [], '0');
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }
}