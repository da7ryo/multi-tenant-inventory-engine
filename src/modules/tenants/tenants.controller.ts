import { Request, Response } from "express";
import * as tenantsService from "./tenants.service";
import {
  TenantCreateReqBody,
  TenantGetReqParams,
  TenantUpdateReqBody,
} from "./tenants.types";
import { id } from "zod/locales";

export async function getTenants(_req: Request, res: Response) {
  const tenants = await tenantsService.getTenants();
  res.json(tenants);
}

export async function createTenant(req: Request, res: Response) {
  const tenant = req.body as TenantCreateReqBody;

  const createdTenant = await tenantsService.createTenant(tenant);
  res.json(createdTenant);
}

export async function getTenant(req: Request, res: Response) {
  const { id } = req.params as TenantGetReqParams;
  const tenant = await tenantsService.getTenant(id);

  res.json(tenant);
}

export async function updateTenant(req: Request, res: Response) {
  const { id } = req.params as TenantGetReqParams;
  const tenantUpdateInput = req.body as TenantUpdateReqBody;

  const tenant = await tenantsService.updateTenant(id, tenantUpdateInput);

  res.json(tenant);
}
