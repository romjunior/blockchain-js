import { Router } from "express";
import { query } from "express-validator";
import { getChain, mineBlockController } from "../controllers/BlockchainController";
import expressValidator from "../middleware/ExpressValidatorMiddleware";


const router = Router();

router.get('/mine', query('publicKey').notEmpty().trim().escape(), expressValidator, mineBlockController);

router.get('/chain', getChain);

export default router;