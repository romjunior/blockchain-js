import { error } from "console";
import { RequestHandler } from "express"
import { ValidationError, validationResult } from "express-validator";
import { Logger } from "tslog";
import { BadRequestError } from "../errors/HttpError";

const log: Logger = new Logger();


const expressValidator: RequestHandler = (req, _res, next) => {
    log.info('init validation');
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const logErrors = errors.array().map(({ msg, param, location }) => { return { msg, param, location } });
        log.error('validationError', logErrors);
        throw new BadRequestError(errors.array(), '');
    }
    log.info('finished validation');
    next();
};

export default expressValidator;