import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { tenantsTable } from "./db.tables";
import { PERMISSION_ACTION, PERMISSION_SCOPE } from "./db.constants";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./db.schema";

export type DbClient = NodePgDatabase<typeof schema>;

type FilterOperators<T> = {
  eq?: T;
  ne?: T;
  gt?: T;
  gte?: T;
  lt?: T;
  lte?: T;
  like?: T;
  ilike?: T;
  in?: T[];
  nin?: T[];
};

// Permissions
export type PermissionScope =
  (typeof PERMISSION_SCOPE)[keyof typeof PERMISSION_SCOPE];
export type PermissionAction =
  (typeof PERMISSION_ACTION)[keyof typeof PERMISSION_ACTION];

//Tenants

export type TenantDb = InferSelectModel<typeof tenantsTable>;
export type TenantCreateDb = InferInsertModel<typeof tenantsTable>;
export type InsertTenantParams = {
  dbClient: DbClient;
  tenantInsertData: TenantCreateDb;
};
export type FindTenantsOptions = {
  page: number;
  size: number;
  sort: string[];
  name?: string | FilterOperators<string>;
};
export type FindTenantsParams = {
  dbClient: DbClient;
  options: FindTenantsOptions;
};

//Users
export type FindUserByEmailOptions = {
  email: string;
};
export type FindUserByEmailParams = {
  dbClient: DbClient;
  options: FindUserByEmailOptions;
};
