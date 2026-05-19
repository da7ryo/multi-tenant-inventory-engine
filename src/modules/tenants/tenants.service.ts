import * as tenantsRepo from "./tenants.repo";

export async function createTenant(tenant: any) {
  await tenantsRepo.createTenant(tenant);
}
