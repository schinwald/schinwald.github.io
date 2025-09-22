import { type AnyColumn, sql } from "drizzle-orm";

export const increment = (column: AnyColumn) => sql`${column} + 1`;
