import { uuid,date,boolean, text, pgTable, varchar, timestamp} from "drizzle-orm/pg-core";


export const user= pgTable("user", {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar('full name', {length: 100}).notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  lastActivityDate: timestamp('last_activity_date').defaultNow(),
  isBlocked: boolean('is_blocked').notNull().default(false),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  }).defaultNow()
});