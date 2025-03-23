import { pgTable, unique, uuid, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const user = pgTable("user", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	fullName: varchar("full name", { length: 100 }).notNull(),
	email: text().notNull(),
	password: text().notNull(),
	lastActivityDate: timestamp("last_activity_date", { mode: 'string' }).defaultNow(),
	isBlocked: boolean("is_blocked").default(false).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);
