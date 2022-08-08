import { Logger } from "tslog";
import Blockchain from "../core/Blockchain";
import Keys from "../core/Keys";
import Transaction from "../core/Transaction";

const log: Logger = new Logger();

interface TransactionListDTO {
    count: number,
    data: TransactionDTO[]
}

interface TransactionDTO {
    fromAddress: string,
    toAddress: string,
    amount: number,
    operation: Operation,
    timestamp: Date,
    signature: string
}

type Operation = 'positive' | 'negative'

export const createTransactionService = async (fromAddress: string, toAddress: string, amount: number): Promise<void> => {
    const fromPublicAddress = Keys.getInstance().getPublic(fromAddress);
    const tr = new Transaction(fromPublicAddress, toAddress, amount);
    tr.signTransaction(fromAddress);
    return await Blockchain.getIstance().addTransaction(tr);
}

export const listAllTransactionForWalletService = async (publicKey: string): Promise<TransactionListDTO> => {
        log.info('list transactions service');
        const txs = await Blockchain.getIstance().getAllTransactionsForWallet(publicKey);
        return {
            count: txs.length,
            data: txs.map(tx => {
                if(tx.getFromAddress == publicKey) {
                    return {
                        fromAddress: tx.getFromAddress,
                        toAddress: tx.getToAddress,
                        amount: tx.getAmount,
                        operation: 'negative',
                        timestamp: tx.getTimestamp,
                        signature: tx.getSignature
                    }
                }
    
                return {
                    fromAddress: tx.getFromAddress,
                    toAddress: tx.getToAddress,
                    amount: tx.getAmount,
                    operation: 'positive',
                    timestamp: tx.getTimestamp,
                    signature: tx.getSignature
                }
            })
        };
}