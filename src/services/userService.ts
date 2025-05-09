import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { users } from '../models/schema';
import * as schema from '../models/schema';
import { eq } from 'drizzle-orm';

export class UserService {
    constructor(private db: BetterSQLite3Database<typeof schema>) {}

    async getAllUsers() {
        return await this.db.select({
            id: users.id,
            username: users.username
        }).from(users).all();
    }

    async getUserById(id: number) {
        return await this.db.select().from(users).where(eq(users.id, id)).get();
    }

    async getUserByUsername(username: string) {
        return await this.db.select().from(users).where(eq(users.username, username)).get();
    }

    async createUser(data: schema.UserInsert) {
        return await this.db.insert(users).values(data).run();
    }

    async updateUser(id: number, data: Partial<schema.UserInsert>) {
        return await this.db.update(users).set(data).where(eq(users.id, id)).run();
    }

    async deleteUser(id: number) {
        return await this.db.delete(users).where(eq(users.id, id)).run();
    }
}