const Blockchain = require('./blockchain');
const Transaction = require('./transaction');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('cde89b5a25dee55643f1da1bb19d8c1b94c7162b8a155a0f3bfcac703e0dfabb');
const myWalletAddress = myKey.getPublic('hex');

let jrCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'publickeygoeshere', 10);
tx1.signTransaction(myKey);

jrCoin.addTransaction(tx1);

console.log('\n start mining...');
jrCoin.minePendingTransactions(myWalletAddress);

console.log(jrCoin.getBalanceOfAddress(myWalletAddress));

console.log(JSON.stringify(jrCoin, null, 4));
