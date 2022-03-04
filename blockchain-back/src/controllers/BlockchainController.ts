import { RequestHandler } from "express";
import Blockchain from "../core/Blockchain";
import { createTransactionService } from "../services/TransactionService";


export const mineBlockController: RequestHandler = async (req, res) => {
    const publicKey = req.query.publicKey as string;
    await Blockchain.getIstance().minePendingTransactions(publicKey);
    res.status(201).json({
        message: 'block mined with success!'
    });
}

export const createTransactionController: RequestHandler =async (req, res, next) => {
    const { fromAddress, toAddress, amount } = req.body;
    try {
        await createTransactionService(fromAddress, toAddress, amount);
    } catch(e) {
        return next(e);
    }
    res.status(201).json({
        message: 'transaction created!'
    });
}