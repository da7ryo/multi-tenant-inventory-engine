import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { CONFIG } from "../config";
console.log(CONFIG.DB_URL);
export default defineConfig({
  out: "./src/core/db/drizzle",
  schema: "./src/core/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: CONFIG.DB_URL,
  },
});
