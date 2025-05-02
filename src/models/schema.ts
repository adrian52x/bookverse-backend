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
  status: text('status', { enum: ['to_read', 'in_progress', 'read'] }).default('to_read'),
  coverImage: text('cover_image'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export type Genre = typeof genres.$inferSelect;
export type Book = typeof books.$inferSelect;