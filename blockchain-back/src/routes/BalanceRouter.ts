import { Router } from "express";
import { query } from "express-validator";
import { getBalanceOfAddressController } from "../controllers/BalanceController";
import expressValidator from "../middleware/ExpressValidatorMiddleware";

const router = Router();

router.get('/', query('publicKey').notEmpty().trim().escape(), expressValidator, getBalanceOfAddressController);

export default router;