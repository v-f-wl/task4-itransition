import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/node-postgres';


if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables")
}

const sql = neon(process.env.DATABASE_URL!)

export const db = drizzle(process.env.DATABASE_URL!);



