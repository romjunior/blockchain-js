import { Router } from "express";
import { createWalletController, findAllWalletsController, findPublicKeyByAliasController } from "../controllers/WalletController";

const router = Router();

router.get('/create', createWalletController);

router.get('/', findPublicKeyByAliasController);

router.get('/all', findAllWalletsController);

export default router;