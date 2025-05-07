import { Router } from 'express';
import { getBooksHandler, createBookHandler, updateBookHandler, deleteBookHandler, getBookByIdHandler } from '../handlers/bookHandlers';


const router = Router();

router.get('/books', getBooksHandler);

// GET/:id
router.get('/books/:id', getBookByIdHandler);

// POST
router.post('/books', createBookHandler);

// PATCH
router.patch('/books/:id', updateBookHandler);

// DELETE
router.delete('/books/:id', deleteBookHandler);


export default router;