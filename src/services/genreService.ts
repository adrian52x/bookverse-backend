import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { genres } from '../models/schema';
import * as schema from '../models/schema';
import { eq } from 'drizzle-orm';

export class GenreService {
    constructor(private db: BetterSQLite3Database<typeof schema>) {}

    async getAllGenres() {
        return await this.db.select().from(genres).all();
    }

    async createGenre(data: schema.GenreInsert) { 
        return await this.db.insert(genres).values(data).run(); 
    }

    async updateGenre(id: number, data: Partial<schema.GenreInsert>) { 
        return await this.db.update(genres).set(data).where(eq(genres.id, id)).run();
    }

    async deleteGenre(id: number) {
        return await this.db.delete(genres).where(eq(genres.id, id)).run();
    }
}