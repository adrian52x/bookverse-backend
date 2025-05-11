import { db } from './database';
import { genres, books, users } from '../models/schema';
import bcrypt from 'bcryptjs';

async function createTables() {
    console.log('Creating tables...');

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);
  
    db.run(`
      CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );
    `);
  
    db.run(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        status TEXT DEFAULT 'to_read',
        cover_image TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (genre_id) REFERENCES genres (id)
      );
    `);
  
    console.log('Tables created.');
}

async function seedDatabase() {

    await createTables();

    console.log('Seeding database...');

    // Encrypt passwords
    const pass1 = await bcrypt.hash('123456', 10);
    const pass2 = await bcrypt.hash('123456', 10);

    // Insert users
    db.insert(users).values([
      { username: 'user1', password: pass1 },
      { username: 'user2', password: pass2 },
    ]).run();

    console.log('Users table seeded.');

    // Insert genres
    db.insert(genres).values([
        { name: 'Fiction' },
        { name: 'Non-Fiction' },
        { name: 'Science Fiction' },
        { name: 'Fantasy' },
        { name: 'Mystery' },
        { name: 'Biography' },
        { name: 'Self-Help' },
        { name: 'Romance' },
        { name: 'Thriller' },
        { name: 'Historical Fiction' },
        { name: 'Horror' },
        { name: 'Poetry' },
        { name: 'Graphic Novel' },
        { name: 'Children\'s' },
    ]).run();

    console.log('Genres table seeded.');

    // Insert books
    db.insert(books).values([
        { title: '1984', author: 'George Orwell', genreId: 1, userId: 1, status: 'read', coverImage: 'https://sfnpgydezdiiexmftraz.supabase.co/storage/v1/object/public/bookverse//1984.jpg' },
        { title: 'Sapiens', author: 'Yuval Noah Harari', genreId: 2, userId: 1, status: 'to_read', coverImage: 'https://sfnpgydezdiiexmftraz.supabase.co/storage/v1/object/public/bookverse//sapiens.png' },
        { title: 'Dune', author: 'Frank Herbert', genreId: 3, userId: 2, status: 'in_progress' },
        { title: 'The Hobbit', author: 'J.R.R. Tolkien', genreId: 4, userId: 2, status: 'read', coverImage: 'https://sfnpgydezdiiexmftraz.supabase.co/storage/v1/object/public/bookverse//The-Hobbit-.png' },
        { title: 'The Da Vinci Code', author: 'Dan Brown', genreId: 5, userId: 1, status: 'to_read' },
        { title: 'Becoming', author: 'Michelle Obama', genreId: 6, userId: 2, status: 'read', coverImage: 'https://sfnpgydezdiiexmftraz.supabase.co/storage/v1/object/public/bookverse//becoming.webp' },
        { title: 'The Power of Habit', author: 'Charles Duhigg', genreId: 7, userId: 1, status: 'in_progress', coverImage: 'https://sfnpgydezdiiexmftraz.supabase.co/storage/v1/object/public/bookverse//the%20power.jpeg' },
        { title: 'Pride and Prejudice', author: 'Jane Austen', genreId: 8, userId: 2, status: 'to_read', coverImage: 'https://sfnpgydezdiiexmftraz.supabase.co/storage/v1/object/public/bookverse//pride.png' },
    ]).run();

    console.log('Books table seeded.');

    console.log('Database seeding completed!');
}

seedDatabase().catch((error) => {
    console.error('Error seeding database:', error);
});