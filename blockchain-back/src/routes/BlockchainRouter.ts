import { Router } from "express";
import { body, query } from "express-validator";
import { createTransactionController, mineBlockController } from "../controllers/BlockchainController";
import expressValidator from "../middleware/ExpressValidatorMiddleware";


const router = Router();

router.get('/mine', query('publicKey').notEmpty().trim().escape(), expressValidator, mineBlockController);

router.post('/transaction', body('fromAddress').notEmpty(), body('toAddress').notEmpty(), body('amount').notEmpty().isNumeric(), expressValidator, createTransactionController);

export default router;