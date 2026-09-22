import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DbClient } from "./db.types";
import * as schema from "./db.schema";

let pgClient: Pool | undefined;

export function createDbClient(config: {
  databaseUrl: string;
  isLoggerEnabled?: boolean;
}) {
  const pgClient = new Pool({ connectionString: config.databaseUrl });

  return {
    dbClient: drizzle({
      client: pgClient,
      schema,
      logger: !!config.isLoggerEnabled,
    }),
    async closeDbClient() {
      await pgClient.end();
    },
  };
}

export async function closeDbClient(): Promise<void> {
  if (pgClient) {
    await pgClient.end();
    pgClient = undefined;
  }
}
