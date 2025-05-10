import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { books, users, genres } from '../models/schema';
import * as schema from '../models/schema';
import { eq, like, and } from 'drizzle-orm';

interface getAllBooksFilters {
    title?: string;
    genreId?: number;
    userId?: number;
}

export class BookService {
    constructor(private db: BetterSQLite3Database<typeof schema>) {}

    // better-sqlite3 is a synchronous SQLite library 

    async getAllBooks(filters: getAllBooksFilters) {
        const conditions = [];

        if (filters.title) {
            conditions.push(like(books.title, `%${filters.title}%`));
        }
        if (filters.genreId) {
            conditions.push(eq(books.genreId, filters.genreId));
        }
        if (filters.userId) {
            conditions.push(eq(books.userId, filters.userId));
        }

        const booksJoin = this.db
            .select({  // flat object
                id: books.id,
                title: books.title,
                author: books.author,
                genreId: books.genreId,
                userId: books.userId,
                status: books.status,
                coverImage: books.coverImage,
                createdAt: books.createdAt,
                username: users.username,
                genreName: genres.name,
            })
            .from(books)
            .leftJoin(users, eq(books.userId, users.id))
            .leftJoin(genres, eq(books.genreId, genres.id));
    
        const query = conditions.length > 0
            ? booksJoin.where(and(...conditions))
            : booksJoin;
    
    
        return await query.all();
    }

    async getBookById(id: number) {
        return await this.db.select().from(books).where(eq(books.id, id)).get();
    }

    async createBook(data: schema.BookInsert) {
        return await this.db.insert(books).values(data).run();
    }

    async updateBook(id: number, data: Partial<schema.BookInsert>) {
        return await this.db.update(books).set(data).where(eq(books.id, id)).run();
    }

    async deleteBook(id: number) {
        return await this.db.delete(books).where(eq(books.id, id)).run();
    }
}