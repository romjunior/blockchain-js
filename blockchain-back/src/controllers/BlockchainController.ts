import { RequestHandler } from "express";
import Blockchain from "../core/Blockchain";


export const mineBlockController: RequestHandler = async (req, res) => {
    const publicKey = req.query.publicKey as string;
    await Blockchain.getIstance().minePendingTransactions(publicKey);
    res.status(201).json({
        message: 'block mined with success!'
    });
}