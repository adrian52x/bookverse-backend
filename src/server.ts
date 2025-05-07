import express from 'express';
import cors from 'cors';
import { swaggerUi, swaggerSpec } from './swagger';
import { notFound } from './middleware/not-found';
import { error } from './middleware/error';
import bookRoutes from './routes/bookRoutes';
import genreRoutes from './routes/genreRoutes';
import userRoutes from './routes/userRoutes';

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

// Routes
app.use('/api', bookRoutes)
app.use('/api', genreRoutes)
app.use('/api', userRoutes)

// Error handling middleware
app.use(notFound);
app.use(error);

// Running server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Docs: http://localhost:${PORT}/api-docs`);
});