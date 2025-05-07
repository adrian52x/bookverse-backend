import { Router } from 'express';
import { getUsersHandler, loginUserHandler, registerUserHandler } from '../handlers/userHandlers';


const router = Router();


// GET
router.get('/users', getUsersHandler);

// POST
router.post('/login', loginUserHandler);

// POST
router.post('/register', registerUserHandler);


export default router;