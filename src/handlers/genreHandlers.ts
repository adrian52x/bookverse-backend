import { GenreService } from "../services/genreService";
import { NextFunction, Request, Response } from 'express';
import { db } from '../db/database';
import { CustomError } from '../lib/custom-error';
import { ERROR } from '../lib/error-messages';

const genreService = new GenreService(db);


// GET ALL GENRES
export const getGenresHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genres = await genreService.getAllGenres();
        res.status(200).json(genres);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_FETCH_GENRES, 500));
    }
}

// CREATE GENRE
export const createGenreHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newGenre = await genreService.createGenre(req.body);
        res.status(201).json(newGenre);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_CREATE_GENRE, 500, req.url, req.method));
    }
}

// UPDATE GENRE
export const updateGenreHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const updatedGenre = await genreService.updateGenre(Number(id), req.body);
        res.status(200).json(updatedGenre);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_UPDATE_GENRE, 500, req.url, req.method));
    }
}

// DELETE GENRE
export const deleteGenreHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const deletedGenre = await genreService.deleteGenre(Number(id));
        res.status(200).json(deletedGenre);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_DELETE_GENRE, 500, req.url, req.method));
    }
}