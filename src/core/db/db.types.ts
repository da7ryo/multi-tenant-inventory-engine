import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { roles, tenants, users } from "./schema";

export type TenantDb = InferSelectModel<typeof tenants>;
export type TenantCreateDb = InferInsertModel<typeof tenants>;
export type UserDb = InferSelectModel<typeof users>;
export type RoleDb = InferSelectModel<typeof roles>;
export type RoleCreateDb = InferInsertModel<typeof roles>;
