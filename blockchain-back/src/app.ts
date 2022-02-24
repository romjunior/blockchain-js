import { json } from 'body-parser';
import express, { Express, NextFunction, Request, Response } from 'express';

import WalletRouter from './routes/WalletRouter';
import { ec as EC } from "elliptic";
import Blockchain from './core/Blockchain';
import Transaction from './model/Transaction';

/* const algoritm: string = 'secp256k1';
const hex = 'hex';
const base64: string = 'base64';

const ECInstance = new EC('secp256k1');

const myKey = ECInstance.keyFromPrivate('cde89b5a25dee55643f1da1bb19d8c1b94c7162b8a155a0f3bfcac703e0dfabb');
const myWalletAddress = myKey.getPublic('hex');

let jrCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'publickeygoeshere', 10);
tx1.signTransaction(myKey.getPrivate('hex'));

jrCoin.addTransaction(tx1);

console.log('\n start mining...');
jrCoin.minePendingTransactions(myWalletAddress);

console.log(jrCoin.getBalanceOfAddress(myWalletAddress));

console.log(JSON.stringify(jrCoin, null, 4));

console.log(`is Valid Blockchain: ${jrCoin.isChainValid()}`) */

const app: Express = express();

app.use(json());

app.use('/wallet', WalletRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});