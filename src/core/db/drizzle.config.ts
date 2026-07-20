import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { CONFIG } from "../config";

export default defineConfig({
  out: "./src/core/db/drizzle",
  schema: "./src/core/db/db.schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: CONFIG.DB_URL,
  },
});
