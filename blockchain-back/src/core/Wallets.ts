import Wallet from "../types/Wallet";

const wallets: Wallet[] = [];

export const createWallet = (alias: string) => {
    for(const w of wallets) {
        if(w.alias === alias) {
            throw new Error('Wallet alias already exists! choose other alias.');
        }
    }
}