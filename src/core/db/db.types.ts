import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { tenantsTable } from "./db.tables";
import { PERMISSION_ACTION, PERMISSION_SCOPE } from "./db.constants";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./db.schema";

export type DbClient = NodePgDatabase<typeof schema>;

// Permissions
export type PermissionScope =
  (typeof PERMISSION_SCOPE)[keyof typeof PERMISSION_SCOPE];
export type PermissionAction =
  (typeof PERMISSION_ACTION)[keyof typeof PERMISSION_ACTION];

//Tenants
export type TenantDb = InferSelectModel<typeof tenantsTable>;
export type TenantCreateDb = InferInsertModel<typeof tenantsTable>;
