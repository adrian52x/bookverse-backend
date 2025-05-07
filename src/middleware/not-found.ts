import { Response, Request, NextFunction } from "express";
import { CustomError } from "../lib/custom-error";
import { ERROR } from "../lib/error-messages";

export function notFound(req: Request, res: Response, next: NextFunction) {
  return next(new CustomError(ERROR.ROUTE_NOT_FOUND, 404, req.url));
}