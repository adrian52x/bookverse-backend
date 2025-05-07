import { Request, Response, NextFunction } from "express";
import { CustomError } from "../lib/custom-error";

export function error(
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) {

    let status = err.status || 500; 
    let message = err.message || "Internal Server Error";

    // Try to parse JSON error messages, otherwise send as plain text
    try {
        message = JSON.parse(message);
    } catch {}

    const errorResponse: any = { message };
    if (err.url) errorResponse.url = err.url;
    if (err.method) errorResponse.method = err.method;

    res.status(status).json(errorResponse);
}
