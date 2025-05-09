import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../lib/custom-error';
import { ERROR } from '../lib/error-messages';
import { validationResult } from 'express-validator';
import { UserService } from '../services/userService';
import { db } from '../db/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/authJWT';

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

        // Always compare passwords to prevent timing attacks
        const isPasswordValid = user ? await bcrypt.compare(req.body.password, user.password) : false;

        if (!user || !isPasswordValid) {
            return next(new CustomError(ERROR.INVALID_CREDENTIALS, 401, req.url, req.method));
        }

        // process.env.JWT_SECRET
        const token = jwt.sign({ id: user.id }, "MySecretKey", { expiresIn: '1h' });
        
        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 3600000 });

        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_LOGIN_USER, 500, req.url, req.method));
    }
}

export const getLoggedInUserHandler = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    if (!userId) {
        return next(new CustomError(ERROR.UNAUTHORIZED, 401, req.url, req.method));
    }

    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return next(new CustomError(ERROR.USER_NOT_FOUND, 404, req.url, req.method));
        }
        const { password, ...userWithoutPassword } = user; 
        res.status(200).json(userWithoutPassword);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_FETCH_USER, 500, req.url, req.method));
    }
}

export const logoutUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (e) {
        next(new CustomError(ERROR.FAILED_LOGOUT_USER, 500, req.url, req.method));
    }
}