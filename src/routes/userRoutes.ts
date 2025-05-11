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
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAuthInput'
 *     responses:
 *       200:
 *         description: Login successful, returns user without password and sends token as cookie [use above example to login]
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAuthResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 */
router.post('/login', loginUserValidator, loginUserHandler);

// POST
router.post('/register', registerUserValidator, registerUserHandler);

// POST
router.post('/logout', logoutUserHandler);


export default router;