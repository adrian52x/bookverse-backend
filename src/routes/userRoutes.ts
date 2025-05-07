import { Router } from 'express';
import { getUsersHandler, loginUserHandler, registerUserHandler } from '../handlers/userHandlers';
import { registerUserValidator, loginUserValidator } from '../lib/validator-functions';

const router = Router();


// GET
router.get('/users', getUsersHandler);

// POST
router.post('/login', loginUserValidator, loginUserHandler);

// POST
router.post('/register', registerUserValidator, registerUserHandler);


export default router;