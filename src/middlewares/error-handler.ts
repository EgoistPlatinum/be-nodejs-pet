/* eslint-disable @typescript-eslint/no-unused-vars*/
import {NextFunction, Request, Response} from "express";
import {CustomError} from "../errors/custom-error";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
    }

    res.status(500).json({message: "Internal server error"});
}