import { Router } from 'express';
import { genreValidator } from '../lib/validator-functions';
import { createGenreHandler, deleteGenreHandler, getGenresHandler, updateGenreHandler } from '../handlers/genreHandlers';


const router = Router();

// GET
router.get('/genres', getGenresHandler);

// POST
router.post('/genres', genreValidator, createGenreHandler);

// PATCH
router.patch('/genres/:id', genreValidator, updateGenreHandler);

// DELETE
router.delete('/genres/:id', deleteGenreHandler);


export default router;