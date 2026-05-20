import { db, TenantCreateDb, tenants } from "../../core/db";

export async function createTenant(tenant: TenantCreateDb) {
  const [createdTenant] = await db.insert(tenants).values(tenant).returning();
  return createdTenant;
}
