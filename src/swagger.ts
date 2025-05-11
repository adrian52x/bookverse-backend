import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookVerse API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Book: {
          type: 'object',
          properties: {
            id: { type: 'integer', minimum: 1 },
            title: { type: 'string' },
            author: { type: 'string' },
            genreId: { type: 'integer', minimum: 1 },
            status: { type: 'string', enum: ['to_read', 'in_progress', 'read'] },
            coverImage: { type: 'string' },
            createdAt: { type: 'string' },
          },
        },
        BookWithRelations: {
          type: 'object',
          properties: {
            id: { type: 'integer', minimum: 1 },
            title: { type: 'string' },
            author: { type: 'string' },
            genreId: { type: 'integer', minimum: 1 },
            userId: { type: 'integer', minimum: 1 },
            status: { type: 'string', enum: ['to_read', 'in_progress', 'read'] },
            coverImage: { type: 'string' },
            createdAt: { type: 'string' },
            username: { type: 'string' },    
            genreName: { type: 'string' },  
          },
          example: {
            id: 1,
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            genreId: 1,
            userId: 1,
            status: 'read',
            coverImage: 'https://example.com/great-gatsby.jpg',
            createdAt: '2023-10-01T12:00:00Z',
            username: 'john_doe',
            genreName: 'Fiction',
          }
        },
        BookInput: {
          type: 'object',
          required: ['title', 'author', 'genreId'],
          properties: {
            title: { type: 'string' },
            author: { type: 'string' },
            genreId: { type: 'integer', minimum: 1 },
            status: { type: 'string', enum: ['to_read', 'in_progress', 'read'] },
            coverImage: { type: 'string' },
          },
        },
        Genre: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
          },
        },
        GenreInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
          },
        },
        DbChangeResponse: {
          type: 'object',
          properties: {
            changes: { type: 'integer', example: 1 },
            lastInsertRowid: { type: 'integer', example: 18 },
          },
          example: {
            changes: 1,
            lastInsertRowid: 18,
          },
        },
        ValidationErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string', example: 'field' },
                  value: { type: 'string' },
                  msg: { type: 'string', example: 'Invalid value' },
                  path: { type: 'string', example: 'author' },
                  location: { type: 'string', example: 'body' }
                }
              }
            },
            url: { type: 'string', example: '/books' },
            method: { type: 'string', example: 'POST' }
          },
          example: {
            message: [
              {
                type: "field",
                value: 0,
                msg: "Invalid value",
                path: "author",
                location: "body"
              }
            ],
            url: "/books",
            method: "POST / PATCH"
          }
        },
        UnauthorizedErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'No token provided' },
            url: { type: 'string', example: '/books' },
            method: { type: 'string', example: 'POST' }
          },
          example: {
            message: 'string',
            url: '/books',
            method: 'POST / PATCH / DELETE'
          }
        },
        ForbiddenErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'You do not have permission to perform this action' },
            url: { type: 'string', example: '/books/3' },
            method: { type: 'string', example: 'PATCH' }
          },
          example: {
            message: 'You do not have permission to perform this action',
            url: '/books/3',
            method: 'PATCH / DELETE'
          }
        },
        UserAuthInput: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string', example: 'user1' },
            password: { type: 'string', example: '123456' }
          }
        },
        UserAuthResponse: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            username: { type: 'string', example: 'user1' }
          },
          example: {
            id: 1,
            username: 'user1'
          }
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };