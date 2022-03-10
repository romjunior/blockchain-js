import { RequestHandler } from "express";
import { Logger } from "tslog";
import Blockchain from "../core/Blockchain";

const log: Logger = new Logger();

export const mineBlockController: RequestHandler = async (req, res, next) => {
    log.info('Init');
    try {
        const publicKey = req.query.publicKey as string;
        await Blockchain.getIstance().minePendingTransactions(publicKey);
        log.info('Block mined with success!');
        res.status(201).json({
            message: 'block mined with success!'
        });
    } catch (e) {
        next(e);
    }
}