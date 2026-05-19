import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { tenants } from "./schema";

export type TenantDb = InferSelectModel<typeof tenants>;
export type TenantCreateDb = InferInsertModel<typeof tenants>;
