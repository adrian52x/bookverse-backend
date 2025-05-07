import { Router } from 'express';
import { createGenreHandler, deleteGenreHandler, getGenresHandler, updateGenreHandler } from '../handlers/genreHandlers';


const router = Router();

// GET
router.get('/genres', getGenresHandler);

// POST
router.post('/genres', createGenreHandler);

// PATCH
router.patch('/genres/:id', updateGenreHandler);

// DELETE
router.delete('/genres/:id', deleteGenreHandler);


export default router;