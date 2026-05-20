import * as tenantsRepo from "./tenants.repo";
import { TenantCreateReqBody } from "./tenants.types";

export async function getTenants() {
  const tenants = await tenantsRepo.findTenants();
  return tenants;
}

export async function createTenant(tenant: TenantCreateReqBody) {
  const createdTenant = await tenantsRepo.createTenant(tenant);

  return createdTenant;
}
