import * as tenantsRepo from "./tenants.repo";
import { TenantCreateReqBody } from "./tenants.types";

export async function createTenant(tenant: TenantCreateReqBody) {
  const createdTenant = await tenantsRepo.createTenant(tenant);

  return createdTenant;
}
