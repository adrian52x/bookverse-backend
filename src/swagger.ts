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
            id: { type: 'integer' },
            title: { type: 'string' },
            author: { type: 'string' },
            genreId: { 
              type: 'integer',
              minimum: 1,
            },
            status: { 
              type: 'string',
              enum: ['to_read', 'in_progress', 'read'],
            },
            coverImage: { type: 'string' },
            createdAt: { type: 'string' },
          },
        },
        BookInput: {
          type: 'object',
          required: ['title', 'author', 'genreId'],
          properties: {
            title: { type: 'string' },
            author: { type: 'string' },
            genreId: { 
              type: 'integer',
              minimum: 1,
            },
            status: { 
              type: 'string',
              enum: ['to_read', 'in_progress', 'read'],
            },
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
        ResponseBody: {
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

      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };