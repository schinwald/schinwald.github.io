import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  smallint,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const testimonials = pgTable(
  "testimonials",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    fullName: text("full_name"),
    company: text(),
    occupation: text(),
    review: text(),
    rating: smallint(),
    approved: boolean().default(false).notNull(),
    avatar: text(),
    email: text(),
    sessionId: text("session_id"),
  },
  (table) => [unique("testimonials_email_key").on(table.email)],
);

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    email: text().notNull(),
  },
  (table) => [unique("newsletter_subscribers_email_key").on(table.email)],
);

// export const users = pgTable(
// 	"users",
// 	{
// 		id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
// 		fullName: text("full_name").notNull(),
// 		company: text(),
// 		occupation: text(),
// 		avatarUrl: text("avatar_url"),
// 		email: text(),
// 		createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
// 			.defaultNow()
// 			.notNull(),
// 		updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
// 			.defaultNow()
// 			.notNull(),
// 	},
// 	(table) => [unique("users_email_key").on(table.email)],
// );
//
// export const oauthSessions = pgTable(
// 	"oauth_sessions",
// 	{
// 		id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
// 		userId: uuid("user_id")
// 			.notNull()
// 			.references(() => users.id, { onDelete: "cascade" }),
// 		provider: text("provider").notNull(),
// 		providerId: text("provider_id").notNull(),
// 		accessToken: text("access_token"),
// 		tokenType: text("token_type"),
// 		scope: text(),
// 		expiresAt: timestamp("expires_at", { withTimezone: true }),
// 		createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
// 			.defaultNow()
// 			.notNull(),
// 		updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
// 			.defaultNow()
// 			.notNull(),
// 	},
// 	(table) => [
// 		unique("oauth_sessions_user_id_provider_id_key").on(
// 			table.userId,
// 			table.providerId,
// 		),
// 	],
// );
