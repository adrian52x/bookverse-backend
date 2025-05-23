import { Router } from 'express';
import { getBooksHandler, createBookHandler, updateBookHandler, deleteBookHandler, getBookByIdHandler } from '../handlers/bookHandlers';
import { bookCreateValidator, bookUpdateValidator, getBooksQueryValidator } from '../lib/validator-functions';
import { BookService } from '../services/bookService';
import { db } from '../db/database';
import { verifyToken } from '../middleware/authJWT';
import { authorizeBookOwner } from '../middleware/book-owner';

const router = Router();
const bookService = new BookService(db);
/*
I decided to use a different approach for the bookHandlers in this file.
Decoupled the handlers from the service layer by passing the `bookService` instance as a parameter to each handler.
I did this in order to enable easy dependency injection for unit testing. (mock BookService in tests)
*/

// Added VerifyToken middleware to all routes that modify data (POST, PATCH, DELETE)
// Added AuthorizeBookOwner middleware to PATCH and DELETE routes to check if the user is the owner of the book

// GET
/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Returns a list of books
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter books by title (partial match)
 *       - in: query
 *         name: genreId
 *         schema:
 *           type: integer
 *         description: Filter books by genre ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter books by user ID
 *     responses:
 *       200:
 *         description: list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookWithRelations'
 */
router.get('/books', getBooksQueryValidator, getBooksHandler(bookService));

// GET/:id
/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: book ID
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *               example:
 *                  message: "Book not found"
 *                  url: "/api/books/100"
 *                  method: "GET"
 */
router.get('/books/:id', getBookByIdHandler(bookService));

// POST
/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DbChangeResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 * 
 */ 
router.post('/books', 
    verifyToken, 
    bookCreateValidator, 
    createBookHandler(bookService)
);

// PATCH
/**
 * @swagger
 * /api/books/{id}:
 *   patch:
 *     summary: Update a book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DbChangeResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse' 
 * 
 */ 
router.patch('/books/:id', 
    verifyToken, 
    authorizeBookOwner, 
    bookUpdateValidator, 
    updateBookHandler(bookService)
);

// DELETE
/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: book ID
 *     responses:
 *       200:
 *         description: Book deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DbChangeResponse'
 *             example:
 *               changes: 1
 *               lastInsertRowid: 0
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse' 
 * 
 */ 
router.delete('/books/:id',
    verifyToken, 
    authorizeBookOwner,  
    deleteBookHandler(bookService)
);


export default router;