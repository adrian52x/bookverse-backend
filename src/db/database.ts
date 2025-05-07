import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '../models/schema';

const sqlite = new Database('db/sqlite-bookverse.db');
export const db = drizzle(sqlite, { schema });
