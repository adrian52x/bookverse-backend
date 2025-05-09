import { NextFunction, Request, Response } from 'express';
import { BookService } from '../services/bookService';
import { CustomError } from '../lib/custom-error';
import { ERROR } from '../lib/error-messages';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/authJWT';

/*
Functional programming concept called Higher Order Function.
Handler is a function that return another function (express middleware).
*/

// GET ALL BOOKS
export const getBooksHandler = (bookService: BookService) => 
    async (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new CustomError(JSON.stringify(errors.array()), 400, req.url, req.method));
    }

    try {
        const { title, genreId, userId } = req.query;
        const filters: {
            title?: string;
            genreId?: number;
            userId?: number;
        } = {};

        if (title) filters.title = String(title);
        if (genreId) filters.genreId = Number(genreId);
        if (userId) filters.userId = Number(userId);

        const books = await bookService.getAllBooks(filters);
        res.status(200).json(books);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_FETCH_BOOKS, 500));
    }
};

// GET BOOK BY ID
export const getBookByIdHandler = (bookService: BookService) => 
    async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const book = await bookService.getBookById(Number(id));
        if (!book) {
            return next(new CustomError(ERROR.BOOK_NOT_FOUND, 404, req.url, req.method));
        }
        res.status(200).json(book);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_FETCH_BOOKS, 500, req.url, req.method));
    }
}

// CREATE BOOK
export const createBookHandler = (bookService: BookService) => 
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        
    const errors = validationResult(req)

    // Check for validation errors
    if (!errors.isEmpty()) {
        return next(new CustomError(JSON.stringify(errors.array()), 400, req.url, req.method));
    }

    try {
        // Add userId from req.user to the book data
        const bookData = { ...req.body, userId: req.user?.id };
        const newBook = await bookService.createBook(bookData);
        res.status(201).json(newBook);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_CREATE_BOOK, 500, req.url, req.method));
    }   
};

// UPDATE BOOK
export const updateBookHandler = (bookService: BookService) => 
    async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const errors = validationResult(req)

    // Check for validation errors
    if (!errors.isEmpty()) {
        return next(new CustomError(JSON.stringify(errors.array()), 400, req.url, req.method));
    }

    try {
        const updatedBook = await bookService.updateBook(Number(id), req.body);
        res.status(200).json(updatedBook);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_UPDATE_BOOK, 500, req.url, req.method));
    }
}

// DELETE BOOK
export const deleteBookHandler = (bookService: BookService) => 
    async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const deletedBook = await bookService.deleteBook(Number(id));
        res.status(200).json(deletedBook);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_DELETE_BOOK, 500, req.url, req.method));
    }
}