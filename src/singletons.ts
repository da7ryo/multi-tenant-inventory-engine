import { CONFIG } from "./core/config";
import { createDbClient } from "./core/db/db.client";

export const dbClient = createDbClient({ databaseUrl: CONFIG.DB_URL });
