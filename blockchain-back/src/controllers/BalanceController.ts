import { RequestHandler } from "express";
import { Logger } from "tslog";
import Blockchain from "../core/Blockchain";

const log: Logger = new Logger();

export const getBalanceOfAddressController: RequestHandler = async (req, res, next) => {
    log.info('Init');
    const publicKey: string = req.query.publicKey as string;
    let balance: number;
    try {
        balance = await Blockchain.getIstance().getBalanceOfAddress(publicKey);
    } catch (e) {
        log.error(`error=${e}`);
        return next(e);
    }
    log.info(`success for wallet=${publicKey}`);
    res.status(200).json({
        balance
    });
}