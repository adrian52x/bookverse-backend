import { body, param, query } from "express-validator";
import { db } from "../db/database";
import { users } from "../models/schema";
import { eq } from 'drizzle-orm';


/**
 * `.trim()` removes leading and trailing whitespace from the input string.
 *
 * `.escape()` replaces HTML special characters in the input string with their corresponding HTML entities.
 * For example, `<` becomes `&lt;`, `>` becomes `&gt;`, and `&` becomes `&amp;`.
 * This helps prevent Cross-Site Scripting (XSS) attacks by ensuring that user input 
 * cannot be interpreted as executable HTML or JavaScript code.
*/

export const getBooksQueryValidator = [
  query("title")
    .optional()
    .isString().withMessage("Title must be a string")
    .trim()
    .escape(),
  query("genreId")
    .optional()
    .isInt({ min: 1 }).withMessage("Genre ID must be a positive integer"),
  query("userId")
    .optional()
    .isInt({ min: 1 }).withMessage("User ID must be a positive integer")
]

export const bookCreateValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .escape(),
  body("author")
    .trim()
    .notEmpty().withMessage("Author is required")
    .isString().withMessage("Author must be a string")
    .escape(),
  body("genreId")
    .notEmpty().withMessage("Genre ID is required")
    .isInt({ min: 1 }).withMessage("Genre ID must be a positive integer"),
  body("status")
    .optional()
    .isIn(['to_read', 'in_progress', 'read']).withMessage("Status must be one of: to_read, in_progress, read"),
  body("coverImage")
    .optional()
    .isString().withMessage("Cover image must be a string")
    .trim(), // maybe .isURL() 
]

export const bookUpdateValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .optional()
    .isString().withMessage("Title must be a string")
    .escape(),
  body("author")
    .trim()
    .notEmpty().withMessage("Author is required")
    .optional()
    .isString().withMessage("Author must be a string")
    .escape(),
  body("genreId")
    .notEmpty().withMessage("Genre ID is required")
    .optional()
    .isInt({ min: 1 }).withMessage("Genre ID must be a positive integer"),
  body("status")
    .optional()
    .isIn(['to_read', 'in_progress', 'read']).withMessage("Status must be one of: to_read, in_progress, read"),
  body("coverImage")
    .trim()
    .optional()
    .isString().withMessage("Cover image must be a string"),
];

export const genreValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string")
    .escape(),
]

export const loginUserValidator = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isString().withMessage("Username must be a string")
    .escape(),
  body("password")
    .notEmpty().withMessage("Password is required")
];

export const registerUserValidator = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isString().withMessage("Username must be a string")
    .isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 and 20 characters")
    .escape()
    .custom(async (value) => {  // Custom validator to check if username already exists
      const existingUser = await db.select().from(users).where(eq(users.username, value)).get();
      if (existingUser) {
        throw new Error("Username already exists");
      }
      return true;
    }),
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];
