import { db, TenantCreateDb, tenants } from "../../core/db";
import { eq } from "drizzle-orm";
import { TenantUpdateReqBody } from "./tenants.types";

export async function findTenants() {
  const retrivedTenants = await db.select().from(tenants);
  return retrivedTenants;
}

export async function createTenant(tenant: TenantCreateDb) {
  const [createdTenant] = await db.insert(tenants).values(tenant).returning();
  return createdTenant;
}

export async function findTenantById(id: string) {
  const [tenant] = await db.select().from(tenants).where(eq(tenants.id, id));

  return tenant || null;
}

export async function updateTenantById(
  id: string,
  inputData: TenantUpdateReqBody,
) {
  const [tenant] = await db
    .update(tenants)
    .set({ ...inputData, updatedAt: new Date() })
    .where(eq(tenants.id, id))
    .returning();

  return tenant || null;
}
