import { RequestHandler } from "express";
import { Logger } from "tslog";
import { createTransactionService, listAllTransactionForWalletService } from "../services/TransactionService";

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
        const response = await listAllTransactionForWalletService(publicKey);
        log.info('listed all transactions with success');
        res.status(200).json(response);
    } catch (e) {
        log.error(`Error=${e}`);
        next(e);
    }

}