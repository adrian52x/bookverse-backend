
import { getBookByIdHandler, getBooksHandler } from "../handlers/bookHandlers";
import { CustomError } from "../lib/custom-error";
import { ERROR } from "../lib/error-messages";


/**
 * @note I haven't written unit tests in TypeScript before, so this
 * implementation may not follow all best practices. 
*/

const mockBooks = [
    { id: 1, title: "Book 1", author: "Author 1" },
    { id: 2, title: "Book 2", author: "Author 2" },
    { id: 3, title: "Book 3", author: "Author 3" },
    { id: 4, title: "Book 4", author: "Author 4" },
    { id: 5, title: "Book 5", author: "Author 5" },
]

// Mocking the BookService
const mockBookService: any = {
    getAllBooks: jest.fn(),
    getBookById: jest.fn(),
    createBook: jest.fn(),
    updateBook: jest.fn(),
    deleteBook: jest.fn(),
};

/**
 * Creates a mock Express response object for testing.
 * The `status` method is mocked to return the response object itself,
 * allowing method chaining (e.g., res.status(200).json(...)).
 *
 * @note Not sure about the return type
 * 
 * @function
 * @returns {object}
 */
function createMockResponse(): object {
    return {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
}

/**
 * Creates a mock Express request object for testing.
 * The request object contains `params`, `body`, `url`, and `method` properties.
 *
 * @function
 * @returns {object} 
 */
function createMockRequest(): object {
    return {
        params: {},
        body: {},
        url: "",
        method: "",
    }
}


describe("Book Handlers", () => {
    let req: any;
    let res: any;
    let next: any;

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test

        // Mock request, response, and next function
        req = createMockRequest();
        res = createMockResponse();
        next = jest.fn();
    });


    it("should fetch all books", async () => {

        mockBookService.getAllBooks.mockResolvedValue(mockBooks); 

        await getBooksHandler(mockBookService)(req, res, next);

        expect(mockBookService.getAllBooks).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockBooks);
    });


    it("should return a book by id with status 200", async () => {
        const book = { id: 10, title: "Book 1", author: "Author 1" };
        mockBookService.getBookById.mockResolvedValue(book);
    
        req.params.id = 10;
    
        await getBookByIdHandler(mockBookService)(req, res, next);
    
        expect(mockBookService.getBookById).toHaveBeenCalledWith(10);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(book);
        expect(next).not.toHaveBeenCalled();
    });
    

    it("should call next with CustomError if book is not found", async () => {
        mockBookService.getBookById.mockResolvedValue(undefined);
    
        req.params.id = 999;
        req.url = "/books/999";
        req.method = "GET";
    
        await getBookByIdHandler(mockBookService)(req, res, next);
    
        // Check if "next" function was called with an instance of CustomError
        expect(next).toHaveBeenCalledWith(expect.any(CustomError));

        /** 
         * next.mock.calls[0][0];
         * Represents the error response object passed to the `next` function.
         * This is typically used in middleware or route handlers to propagate
         * errors to the next error-handling middleware in the chain.
        */
        const err = next.mock.calls[0][0];
        expect(err.message).toBe(ERROR.BOOK_NOT_FOUND);
        expect(err.status).toBe(404);
        expect(err.url).toBe("/books/999");
        expect(err.method).toBe("GET");
    });
});