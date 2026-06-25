import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { tenants, users } from "./schema";

export type TenantDb = InferSelectModel<typeof tenants>;
export type TenantCreateDb = InferInsertModel<typeof tenants>;
export type UserDb = InferSelectModel<typeof users>;
