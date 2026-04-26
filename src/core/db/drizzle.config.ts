import "dotenv/config";
import { defineConfig } from "drizzle-kit";
console.log(process.env.DB_URL);
export default defineConfig({
  out: "./src/core/db/drizzle",
  schema: "./src/core/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
