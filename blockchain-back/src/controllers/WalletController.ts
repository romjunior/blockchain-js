import { RequestHandler } from "express";
import { createWallet, findPublicKeyByAlias, listAllWallets } from "../core/Wallets";



export const createWalletController: RequestHandler = (req, res) => {
    const alias = req.query.alias as string;
    if (!alias) {
        throw new Error('Alias is missing! please fill in alias param');
    }
    const [privateKey, publicKey] = createWallet(alias);
    return res.status(201).json({
        alias,
        privateKey,
        publicKey,
        message: 'The private key is yours! you gonna use to manage your wallet, so dont lose it! we not gonna stored here!'
    });
}

export const findPublicKeyByAliasController: RequestHandler = (req, res) => {
    const alias = req.query.alias as string;
    if (!alias) {
        throw new Error('Alias is missing! please fill in alias param');
    }

    const publicKey = findPublicKeyByAlias(alias);

    if(!publicKey) {
        res.status(404).json({
            message: 'Public key for alias not found'
        });

        return;
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