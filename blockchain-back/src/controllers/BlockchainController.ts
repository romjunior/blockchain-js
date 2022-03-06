import { RequestHandler } from "express";
import { Logger } from "tslog";
import Blockchain from "../core/Blockchain";
import { createTransactionService } from "../services/TransactionService";

const log: Logger = new Logger();


export const mineBlockController: RequestHandler = async (req, res) => {
    log.info('Init');
    const publicKey = req.query.publicKey as string;
    await Blockchain.getIstance().minePendingTransactions(publicKey);
    log.info('Block mined with success!');
    res.status(201).json({
        message: 'block mined with success!'
    });
}

export const createTransactionController: RequestHandler =async (req, res, next) => {
    log.info('Init');
    const { fromAddress, toAddress, amount } = req.body;
    try {
        await createTransactionService(fromAddress, toAddress, amount);
    } catch(e) {
        log.error(`Error=${e}`);
        return next(e);
    }
    log.info('transaction created!');
    res.status(201).json({
        message: 'transaction created!'
    });
}

export const listAllTransactionsForWalletController: RequestHandler = async (req, res) => {
    log.info('Init')
    const publicKey = req.query.publicKey as string;
    const txs = await Blockchain.getIstance().getAllTransactionsForWallet(publicKey);
    log.info('listed all transactions with success');
    res.status(200).json({
        count: txs.length,
        data: txs
    });
}