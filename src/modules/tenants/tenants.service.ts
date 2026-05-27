import * as tenantsRepo from "./tenants.repo";
import { TenantCreateReqBody, TenantUpdateReqBody } from "./tenants.types";

export async function getTenants() {
  const tenants = await tenantsRepo.findTenants();
  return tenants;
}

export async function createTenant(tenant: TenantCreateReqBody) {
  const createdTenant = await tenantsRepo.createTenant(tenant);
  return createdTenant;
}

export async function getTenant(id: string) {
  const tenant = await tenantsRepo.findTenantById(id);
  return tenant;
}

export async function updateTenant(id: string, inputData: TenantUpdateReqBody) {
  const tenant = await tenantsRepo.updateTenantById(id, inputData);
  return tenant;
}
