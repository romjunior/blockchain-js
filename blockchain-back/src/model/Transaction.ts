import { SHA256 } from "crypto-js";
import Keys from "../core/Keys";

export default class Transaction {

    private signature = '';
    private timestamp: Date;

    constructor(private fromAddress: string, private toAddress: string, private amount: number){
        this.timestamp = new Date();
    }

    get getFromAddress() {
        return this.fromAddress;
    }

    get getToAddress() {
        return this.toAddress;
    }

    get getAmount() {
        return this.amount;
    }

    calculateHash(): string {
        return SHA256(this.fromAddress.concat(this.toAddress) + this.amount + this.timestamp).toString();
    }

    signTransaction(signKey: string): void {
        if(Keys.getInstance().getPublic(signKey) !== this.fromAddress) {
            throw Error('You cannot sign transactions for other wallets');
        }
        const hashTx: string = this.calculateHash();
        this.signature = Keys.getInstance().signData(hashTx, signKey);
    }

    isValid(): boolean {
        if(this.fromAddress === '') return true;

        if(!this.signature || this.signature.length === 0) {
            throw Error('No Signature for this transaction');
        }

        return Keys.getInstance().verifySignData(this.calculateHash(), this.signature, this.fromAddress);
    }
}