import { RequestHandler } from "express";
import { Logger } from "tslog";
import Blockchain from "../core/Blockchain";

const log: Logger = new Logger();



export const getBalanceOfAddressController: RequestHandler = async (req, res) => {
    log.info('Init');
    const publicKey: string = req.query.publicKey as string;
    const balance: number = await Blockchain.getIstance().getBalanceOfAddress(publicKey);
    log.info(`success for wallet=${publicKey}`);
    res.status(200).json({
        balance
    });
}