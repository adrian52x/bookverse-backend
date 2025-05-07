import { Request, Response, NextFunction } from "express";
import { db } from "../db/database"; // or use your BookService
import { BookService } from "../services/bookService";
import { CustomError } from "../lib/custom-error";
import { ERROR } from "../lib/error-messages";

const bookService = new BookService(db);

export const authorizeBookOwner = async (req: any, res: Response, next: NextFunction) => {
  const bookId = Number(req.params.id);
  const userId = req.user.id;

  const book = await bookService.getBookById(bookId);

  if (!book) {
    return next(new CustomError(ERROR.BOOK_NOT_FOUND, 404, req.url, req.method));
  }
  if (book.userId !== userId) {
    return next(new CustomError(ERROR.NO_PERMISSION, 403, req.url, req.method));
  }
  next();
};