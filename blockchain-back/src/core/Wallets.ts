import Wallet from "../types/Wallet";
import Keys from "./Keys";

const wallets: Wallet[] = [];

export const createWallet = async (alias: string): Promise<string[]> => {
    for(const w of wallets) {
        if(w.alias === alias) {
            throw new Error('Wallet alias already exists! choose other alias.');
        }
    }

    const keys = Keys.getInstance().generateKeys();
    const [, publicKey ] = keys;
    wallets.push({
        alias,
        publicKey
    });

    return keys;
}

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const findPublicKeyByAlias = async (alias: string): Promise<string | undefined> => {
    return wallets.find(w => w.alias === alias)?.publicKey;
}

export const listAllWallets = async (): Promise<Wallet[]> => {
    return wallets;
}