import { NextFunction, Request, Response } from 'express';
import { BookService } from '../services/bookService';
import { db } from '../db/database';
import { CustomError } from '../lib/custom-error';
import { ERROR } from '../lib/error-messages';

const bookService = new BookService(db);

// GET ALL BOOKS
export const getBooksHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_FETCH_BOOKS, 500));
    }
};

// GET BOOK BY ID
export const getBookByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
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
export const createBookHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newBook = await bookService.createBook(req.body);
        res.status(201).json(newBook);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_CREATE_BOOK, 500, req.url, req.method));
    }   
};

// UPDATE BOOK
export const updateBookHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const updatedBook = await bookService.updateBook(Number(id), req.body);
        res.status(200).json(updatedBook);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_UPDATE_BOOK, 500, req.url, req.method));
    }
}

// DELETE BOOK
export const deleteBookHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const deletedBook = await bookService.deleteBook(Number(id));
        res.status(200).json(deletedBook);
    } catch (e) {
        next(new CustomError(ERROR.FAILED_DELETE_BOOK, 500, req.url, req.method));
    }
}