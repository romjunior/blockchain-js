import { RequestHandler } from "express";
import { Logger } from "tslog";
import { createWallet, findPublicKeyByAlias, listAllWallets } from "../core/Wallets";
import { NotFoundRequestError } from "../errors/HttpError";

const log: Logger = new Logger();

export const createWalletController: RequestHandler = async (req, res, next) => {
    log.info(`Init request`);
    const alias = req.query.alias as string;
    try {
        const [privateKey, publicKey] = await createWallet(alias);
        log.info(`success alias=${alias}, publicKey=${publicKey}`);
        return res.status(201).json({
            alias,
            privateKey,
            publicKey,
            message: 'The private key is yours! you gonna use to manage your wallet, so dont lose it! we not gonna stored here!'
        });
    } catch (err) {
        return next(err);
    }
}

export const findPublicKeyByAliasController: RequestHandler = async (req, res, next) => {
    log.info(`Init request`);
    const alias = req.query.alias as string;

    try {
        const publicKey = await findPublicKeyByAlias(alias);

        if (!publicKey) {
            log.error(`keys not found`);
            return next(new NotFoundRequestError({ message: 'Public key for alias not found' }, ''));
        }
        log.info(`success alias=${alias}, publicKey=${publicKey}`);
        res.status(200).json({
            alias,
            publicKey
        });
    } catch (e) {
        next(e);
    }
}

export const findAllWalletsController: RequestHandler = async (_req, res, next) => {
    log.info(`Init request`);
    try {
        const wallets = await listAllWallets();
        log.info(`success listAllWallets`);
        res.status(200).json({
            total: wallets.length,
            wallets
        });
    } catch (e) {
        next(e);
    }
}