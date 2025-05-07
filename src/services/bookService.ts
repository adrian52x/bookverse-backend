import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { books } from '../models/schema';
import * as schema from '../models/schema';
import { eq } from 'drizzle-orm';

export class BookService {
    constructor(private db: BetterSQLite3Database<typeof schema>) {}

    // better-sqlite3 is a synchronous SQLite library 

    async getAllBooks() {
        return await this.db.select().from(books).all();
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