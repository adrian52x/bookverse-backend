import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../lib/custom-error';
import { ERROR } from '../lib/error-messages';
import { validationResult } from 'express-validator';
import { UserService } from '../services/userService';
import { db } from '../db/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userService = new UserService(db);

export const getUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_FETCH_USERS, 500));
    }
}

export const registerUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    // Check for validation errors
    if (!errors.isEmpty()) {
        return next(new CustomError(JSON.stringify(errors.array()), 400, req.url, req.method));
    }

    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_REGISTER_USER, 500, req.url, req.method));
    }
}

export const loginUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    // Check for validation errors
    if (!errors.isEmpty()) {
        return next(new CustomError(JSON.stringify(errors.array()), 400, req.url, req.method));
    }

    try {
        const user = await userService.getUserByUsername(req.body.username);
        if (!user) {
            return next(new CustomError(ERROR.USER_NOT_FOUND, 404, req.url, req.method));
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return next(new CustomError(ERROR.INVALID_PASSWORD, 401, req.url, req.method));
        }

        // process.env.JWT_SECRET
        const token = jwt.sign({ id: user.id }, "MySecretKey", { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (e) {
        next(new CustomError(ERROR.FAILED_LOGIN_USER, 500, req.url, req.method));
    }
}