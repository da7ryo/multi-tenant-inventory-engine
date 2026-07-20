import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DbClient } from "./db.types";
import * as schema from "./db.schema";

export function createDbClient(config: {
  databaseUrl: string;
  isLoggerEnabled?: boolean;
}): DbClient {
  const pgClient = new Pool({ connectionString: config.databaseUrl });
  return drizzle({
    client: pgClient,
    schema,
    logger: !!config.isLoggerEnabled,
  });
}
