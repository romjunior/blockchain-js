import { RequestHandler } from "express";
import { Logger } from "tslog";
import { createWallet, findPublicKeyByAlias, listAllWallets } from "../core/Wallets";

const log: Logger = new Logger();



export const createWalletController: RequestHandler = (req, res) => {
    log.info(`Init request`)
    const alias = req.query.alias as string;
    const [privateKey, publicKey] = createWallet(alias);
    log.info(`success alias=${alias}, publicKey=${publicKey}`);
    return res.status(201).json({
        alias,
        privateKey,
        publicKey,
        message: 'The private key is yours! you gonna use to manage your wallet, so dont lose it! we not gonna stored here!'
    });
}

export const findPublicKeyByAliasController: RequestHandler = (req, res) => {
    const alias = req.query.alias as string;
    const publicKey = findPublicKeyByAlias(alias);

    if(!publicKey) {
        return res.status(404).json({
            message: 'Public key for alias not found'
        });
    }

    res.status(200).json({
        alias,
        publicKey
    });
}

export const findAllWalletsController: RequestHandler = (req, res) => {
    const wallets = listAllWallets();
    res.status(200).json({
        total: wallets.length,
        wallets
    });
}