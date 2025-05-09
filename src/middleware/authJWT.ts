import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../lib/custom-error";
import { ERROR } from "../lib/error-messages";

export interface AuthRequest extends Request {
  user?: { id: number };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    // Check cookie
    token = req.cookies.token;
  }

  if (!token) {
    return next(new CustomError(ERROR.NO_TOKEN, 401, req.url, req.method));
  }


  try {
    const decoded = jwt.verify(token, "MySecretKey") as { id: number };
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return next(new CustomError(ERROR.INVALID_TOKEN, 401, req.url, req.method));
  }
};