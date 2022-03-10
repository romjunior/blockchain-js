import { Router } from "express";
import { body, query } from "express-validator";
import { createTransactionController, listAllTransactionsForWalletController } from "../controllers/TransactionController";
import expressValidator from "../middleware/ExpressValidatorMiddleware";


const router = Router();

router.post('/', body('fromAddress').notEmpty(), body('toAddress').notEmpty(), body('amount').isNumeric(), expressValidator, createTransactionController);

router.get('/', query('publicKey').notEmpty().trim().escape(), expressValidator, listAllTransactionsForWalletController);

export default router;