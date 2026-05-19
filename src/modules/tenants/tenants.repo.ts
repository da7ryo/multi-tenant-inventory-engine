import { db, TenantCreateDb, tenants } from "../../core/db";

export async function createTenant(tenant: TenantCreateDb) {
  await db.insert(tenants).values(tenant);
}
