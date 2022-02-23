import { SHA256 } from "crypto-js";
import { ec as EC } from "elliptic";

const algoritm: string = 'secp256k1';
const hex = 'hex';
const base64: string = 'base64';

const ECInstance = new EC('secp256k1');

export default class Transaction {

    private signature: string = '';

    constructor(private fromAddress: string, private toAddress: string, private amount: number){
    }

    calculateHash(): string {
        return SHA256(this.fromAddress.concat(this.toAddress) + this.amount).toString();
    }

    signTransaction(signKey: EC.KeyPair): void {
        if(signKey.getPublic(hex) !== this.fromAddress) {
            throw Error('You cannot sign transactions for other wallets');
        }
        const hashTx: string = this.calculateHash();
        const sig = signKey.sign(hashTx, base64);
        this.signature = sig.toDER(hex);
    }

    isValid(): boolean {
        if(this.fromAddress === null) return true;

        if(!this.signature || this.signature.length === 0) {
            throw Error('No Signature for this transaction');
        }

        const publicKey: EC.KeyPair = ECInstance.keyFromPublic(this.fromAddress, hex);
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}