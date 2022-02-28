import { Router } from "express";
import { query } from "express-validator";
import { createWalletController, findAllWalletsController, findPublicKeyByAliasController } from "../controllers/WalletController";
import expressValidator from "../middleware/ExpressValidatorMiddleware";

const router = Router();

router.get('/create', query('alias').notEmpty(), expressValidator, createWalletController);

router.get('/', query('alias').notEmpty(), expressValidator, findPublicKeyByAliasController);

router.get('/all', findAllWalletsController);

export default router;