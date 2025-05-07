import express from 'express';
import cors from 'cors';
import { swaggerUi, swaggerSpec } from './swagger';
import { notFound } from './middleware/not-found';
import { error } from './middleware/error';

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * SHOULD be placed early in the middleware stack
 * Sets up middleware for parsing JSON and URL-encoded data,
 * enables CORS (handle cross-origin requests)
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Api docs - swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use(notFound);
app.use(error);

// Running server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Docs: http://localhost:${PORT}/api-docs`);
});