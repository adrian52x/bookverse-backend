## Features Implemented

- **User Authentication**: JWT-based authentication with middleware for token verification (supports both Authorization header and cookies).
- **Modular Project Structure**: Code is organized into clear modules (handlers, services, middleware, routes, etc.) for maintainability and scalability.
- **Dependency Injection Pattern**: Services are injected into handlers, making the codebase more testable and flexible. 
_(Currently, dependency injection is implemented for bookHandlers.)_
- **Book Management**: CRUD operations for books, including filtering by title, genre, and user.
- **Genre Management**: CRUD operations for genres.
- **User Management**: User registration and login with password hashing (bcrypt).
- **Validation**: Input validation and sanitization using express-validator.
- **Error Handling**: Centralized error handling middleware and custom error classes.
- **Relations**: Books are linked to users and genres, with joined queries returning related data.
- **Testing**: Unit tests for handlers (booksHandler.spec.ts) using Jest and request/response mocking.
- **Swagger Integration**: API documentation setup (Swagger UI).


## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create an empty `db` folder in the root of the project**
   ```bash
   mkdir db
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Seed the database with initial data**
   ```bash
   npm run seed
   ```

## Folder Structure

```
bookverse-backend/
├── db/                         # Database files
│   └── bookverse.db            # SQLite database file (created on first run of the seed script)
├── src/
│   ├── db/
│   │   ├── database.ts         # Database connection setup
│   │   └── seed.ts             # Database seeding script
│   ├── handlers/               # Express route handlers (controllers)
│   │   ├── bookHandlers.ts
│   │   └── genreHandlers.ts
│   │   └── userHandlers.ts
│   ├── lib/                    # Utility libraries (validators, errors, etc.)
│   │   ├── custom-error.ts
│   │   ├── error-messages.ts
│   │   └── validator-functions.ts
│   ├── middleware/             # Express middleware (auth, error handling, etc.)
│   │   ├── authJWT.ts
│   │   ├── book-owner.ts
│   │   ├── error.ts
│   │   └── not-found.ts
│   ├── models/                 # Database schema definitions
│   │   └── schema.ts
│   ├── routes/                 # Express route definitions
│   │   ├── bookRoutes.ts
│   │   ├── genreRoutes.ts
│   │   └── userRoutes.ts
│   ├── services/               # Business logic and database access
│   │   ├── bookService.ts
│   │   ├── genreService.ts
│   │   └── userService.ts
│   ├── __tests__/              # Unit and integration tests
│   │   └── booksHandler.spec.ts
│   └── server.ts               # Express server entry point
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```


# BookVerse - Book Tracking Application

A modern book tracking application built with TypeScript, Express, and Drizzle ORM. This repository contains the backend server for the BookVerse application.

## Project Overview

BookVerse is a book tracking application that allows users to manage their reading list. Users can add books, categorize them by genres, and track their reading status (to read, in progress, or read).
## Tech Stack

- **TypeScript**: Provides type safety and better developer experience
- **Express**: Web framework for Node.js
- **Drizzle ORM**: SQL ORM for TypeScript and JavaScript
- **SQLite**: Lightweight database for storage
- **Better-SQLite3**: SQLite driver for Node.js

## Folder Structure

```
server/
├── db/                       # Database files
│   └── bookverse.db          # SQLite database file (created on first run of the seed script)
├── src/
│   ├── db/
│   │   ├── database.ts       # Database connection setup
│   │   └── seed.ts           # Database seeding script
│   ├── models/
│   │   └── schema.ts         # Database schema definition
│   └── index.ts              # Express server entry point
├── package.json              # Project dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone git@github.com:io-m/bookverse-backend.git
cd server
```

2. Install dependencies
```bash
npm install
```

### Running the Application

#### Development Mode

```bash
npm run dev
```

This will start the server in development mode with hot-reloading at http://localhost:5000.

#### Production Mode

```bash
npm run build
npm start
```

### Seeding the Database

To populate the database with initial data, run:

```bash
npm run seed
```

This will create the necessary tables and populate them with sample books and genres.

## Database Schema

### Genres Table
- `id`: Integer (Primary Key, Auto Increment)
- `name`: Text (Not Null, Unique)

### Books Table
- `id`: Integer (Primary Key, Auto Increment)
- `title`: Text (Not Null)
- `author`: Text (Not Null)
- `genre_id`: Integer (Foreign Key to Genres Table)
- `status`: Text (Enum: 'to_read', 'in_progress', 'read'; Default: 'to_read')
- `cover_image`: Text
- `created_at`: Text (Default: Current Timestamp)

## Code Challenge Goals

This code challenge aims to demonstrate proficiency in:

1. **TypeScript**: Using TypeScript for type safety and better code organization
2. **Drizzle ORM**: Implementing a modern SQL ORM for database operations
3. **API Design**: Creating well-structured RESTful APIs for book management
4. **Design Patterns**: Using design patterns such as Dependency Injection for better code maintainability

### Bonus Goals

- Implement dependency injection pattern for better testability
- Add comprehensive error handling
- Implement data validation
- Document API endpoints using Swagger or similar tools
- If you reaaaaly want to impress us maybe add some test cases

## Next Steps

This project provides a minimal backend structure. To complete the application, consider:

1. Implementing CRUD operations for books and genres
2. Adding user authentication and authorization
3. Adding more advanced features like book reviews, reading statistics, etc.

## Contributing

This is a code challenge repository. To participate, please FORK this repository and push your changes to your forked repository. Do not create pull requests to the original repository.
