import { Logger } from "tslog";
import Blockchain from "../core/Blockchain";
import Keys from "../core/Keys";
import Transaction from "../model/Transaction";

const log: Logger = new Logger();

export interface TransactionListDTO {
    count: number,
    data: TransactionDTO[]
}

export interface TransactionDTO {
    fromAddress: string,
    toAddress: string,
    amount: number,
    operation: string,
    timestamp: Date,
    signature: string
}

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