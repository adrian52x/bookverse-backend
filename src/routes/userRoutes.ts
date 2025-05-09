import { Router } from 'express';
import { getLoggedInUserHandler, getUsersHandler, loginUserHandler, logoutUserHandler, registerUserHandler } from '../handlers/userHandlers';
import { registerUserValidator, loginUserValidator } from '../lib/validator-functions';
import { verifyToken } from '../middleware/authJWT';
import { log } from 'console';

const router = Router();


// GET
router.get('/users', getUsersHandler);

// GET
router.get('/users/me', verifyToken, getLoggedInUserHandler);

// POST
router.post('/login', loginUserValidator, loginUserHandler);

// POST
router.post('/register', registerUserValidator, registerUserHandler);

// POST
router.post('/logout', logoutUserHandler);


export default router;