import { Router } from "express";
import { body, query } from "express-validator";
import { createTransactionController, listAllTransactionsForWalletController, mineBlockController } from "../controllers/BlockchainController";
import expressValidator from "../middleware/ExpressValidatorMiddleware";


const router = Router();

router.get('/mine', query('publicKey').notEmpty().trim().escape(), expressValidator, mineBlockController);

router.post('/transaction', body('fromAddress').notEmpty(), body('toAddress').notEmpty(), body('amount').notEmpty().isNumeric(), expressValidator, createTransactionController);

router.get('/transaction', query('publicKey').notEmpty().trim().escape(), expressValidator, listAllTransactionsForWalletController);

export default router;