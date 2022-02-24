import { ec as EC } from "elliptic";

const algoritm: string = 'secp256k1';
const hex = 'hex';
const base64: string = 'base64';

export default class Keys {
    private static instance: Keys;

    private constructor(private ECInstance: EC) { }

    public static getInstance(): Keys {
        if (!Keys.instance) {
            Keys.instance = new Keys(new EC(algoritm));
        }

        return Keys.instance;
    }

    generateKeys(): string[] {
        const myKeys = this.ECInstance.genKeyPair();
        return [myKeys.getPrivate(hex), myKeys.getPublic(hex)];
    }

    getPublic(privateKey: string): string {
        return this.ECInstance.keyFromPrivate(privateKey, hex).getPublic(hex);
    }

    signData(data: string, privateKey: string): string {
        return this.ECInstance.keyFromPrivate(privateKey, hex).sign(data, base64).toDER(hex);
    }

    verifySignData(data: string, signature: string, publicKey: string) {
        return this.ECInstance.keyFromPublic(publicKey, hex).verify(data, signature);
    }
}