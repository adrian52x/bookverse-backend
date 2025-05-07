import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../lib/custom-error";
import { ERROR } from "../lib/error-messages";

export interface AuthRequest extends Request {
  user?: { id: number };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header: ", authHeader); 
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new CustomError(ERROR.NO_TOKEN, 401, req.url, req.method));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "MySecretKey") as { id: number };
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return next(new CustomError(ERROR.INVALID_TOKEN, 401, req.url, req.method));
  }
};