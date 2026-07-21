import { CONFIG } from "./core/config";
import { createDbClient } from "./core/db/db.client";
import { AppLogger } from "./shared/shared.utils";

export const dbClient = createDbClient({ databaseUrl: CONFIG.DB_URL });

export const appLogger = new AppLogger();
