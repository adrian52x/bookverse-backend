import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const genres = sqliteTable('genres', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
});

export const books = sqliteTable('books', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  author: text('author').notNull(),
  genreId: integer('genre_id').notNull().references(() => genres.id),
  userId: integer('user_id').notNull().references(() => users.id),
  status: text('status', { enum: ['to_read', 'in_progress', 'read'] }).default('to_read'),
  coverImage: text('cover_image'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
});

export type Genre = typeof genres.$inferSelect;
export type Book = typeof books.$inferSelect;
export type User = typeof users.$inferSelect;

export type GenreInsert = typeof genres.$inferInsert;
export type BookInsert = typeof books.$inferInsert;
export type UserInsert = typeof users.$inferInsert;
