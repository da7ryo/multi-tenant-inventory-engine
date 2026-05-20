import { db, TenantCreateDb, tenants } from "../../core/db";

export async function findTenants() {
  const retrivedTenants = await db.select().from(tenants);
  return retrivedTenants;
}

export async function createTenant(tenant: TenantCreateDb) {
  const [createdTenant] = await db.insert(tenants).values(tenant).returning();
  return createdTenant;
}
