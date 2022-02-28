import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Logger } from "tslog";
import { HttpError } from "../errors/HttpError";

const log: Logger = new Logger();


const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if(err instanceof HttpError) {
        log.error(`handling http error statusCode=${err.statusCode}`);
        return res.status(err.statusCode).json({
            data: err.dataResponse
        });
    }
    log.error(`handling error message=${err.message}`);
    res.status(500).json({ message: err.message });
}

export default errorHandler;