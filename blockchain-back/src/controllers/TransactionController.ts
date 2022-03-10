import { RequestHandler } from "express";
import { Logger } from "tslog";
import Blockchain from "../core/Blockchain";
import { createTransactionService } from "../services/TransactionService";

const log: Logger = new Logger();

export const createTransactionController: RequestHandler = async (req, res, next) => {
    log.info('Init');
    try {
        const { fromAddress, toAddress, amount } = req.body;
        await createTransactionService(fromAddress, toAddress, amount);
        log.info('transaction created!');
        res.status(201).json({
            message: 'transaction created!'
        });
    } catch (e) {
        log.error(`Error=${e}`);
        next(e);
    }
}

export const listAllTransactionsForWalletController: RequestHandler = async (req, res, next) => {
    log.info('Init')
    try {
        const publicKey = req.query.publicKey as string;
        const txs = await Blockchain.getIstance().getAllTransactionsForWallet(publicKey);
        log.info('listed all transactions with success');
        res.status(200).json({
            count: txs.length,
            data: txs
        });
    } catch (e) {
        next(e);
    }

}