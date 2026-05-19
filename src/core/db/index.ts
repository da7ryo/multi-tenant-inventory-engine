import { drizzle } from "drizzle-orm/node-postgres";
import { CONFIG } from "../config";

export * from "./db.types";
export * from "./schema";

export const db = drizzle(CONFIG.DB_URL);
