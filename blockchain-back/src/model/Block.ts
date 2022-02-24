import { SHA256 } from "crypto-js";
import Transaction from "./Transaction";

export default class Block {
    private hash: string;
    private nonce: number;
    constructor(private timestamp: Date, private data: Transaction[], private previousHash: string = '') {
        this.hash = '';
        this.nonce = 0;
    }

    get getHash(): string {
        return this.hash;
    }

    get getPreviousHash(): string {
        return this.previousHash;
    }

    get getData(): Transaction[] {
        return this.data;
    }

    calculateHash(): string {
        return SHA256(this.timestamp.toDateString() + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
    }

    mineBlock(difficulty: number) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }

    hasValidTransactions(): boolean {
        for(const tx of this.data) {
            if(!tx.isValid()) return false;
        }
        return true;
    }
}