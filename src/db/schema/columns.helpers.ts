import { timestamp, uuid } from "drizzle-orm/pg-core";
import { generateId } from "@/lib/id";

/** Standard `id uuid primary key` column, generated app-side (AD-02). */
export const id = () => uuid("id").primaryKey().$defaultFn(generateId);

/** Standard `created_at` / `updated_at` pair required on every table (AD-02). */
export const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};
