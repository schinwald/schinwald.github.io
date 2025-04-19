import { pgTable, unique, bigint, timestamp, text, smallint, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const testimonials = pgTable("testimonials", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "testimonials_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	fullName: text("full_name").notNull(),
	company: text(),
	occupation: text(),
	review: text().notNull(),
	rating: smallint().notNull(),
	approved: boolean().default(false).notNull(),
	avatar: text(),
	email: text(),
	sessionId: text("session_id"),
}, (table) => [
	unique("testimonials_email_key").on(table.email),
]);
