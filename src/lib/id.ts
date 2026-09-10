import { v7 as uuidv7 } from "uuid";

/**
 * Generates a UUID v7 for use as a primary key (AD-02).
 *
 * UUID v7 embeds a millisecond timestamp in its most significant bits, so
 * ids sort chronologically and B-tree indexes stay append-mostly instead of
 * fragmenting the way UUID v4 does. Generated app-side (not DB-side) so the
 * id is known before insert, which lets Server Actions build optimistic UI.
 */
export function generateId(): string {
  return uuidv7();
}
