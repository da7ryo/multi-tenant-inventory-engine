import { AppError } from "../../core/error/app-error";
import { HttpStatusCode } from "../../core/http";
import { TENANT_ERROR_MESSAGE } from "./tenants.constants";
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

  if (!tenant) {
    throw new AppError(
      TENANT_ERROR_MESSAGE.TenantNotFound,
      HttpStatusCode.NOT_FOUND,
    );
  }
  return tenant;
}

export async function updateTenant(id: string, inputData: TenantUpdateReqBody) {
  const tenant = await tenantsRepo.updateTenantById(id, inputData);

  if (!tenant) {
    throw new AppError(
      TENANT_ERROR_MESSAGE.TenantNotFound,
      HttpStatusCode.NOT_FOUND,
    );
  }

  return tenant;
}

export async function deleteTenant(id: string) {
  const tenant = await tenantsRepo.deleteTenantById(id);

  if (!tenant) {
    throw new AppError(
      TENANT_ERROR_MESSAGE.TenantNotFound,
      HttpStatusCode.NOT_FOUND,
    );
  }

  return null;
}
