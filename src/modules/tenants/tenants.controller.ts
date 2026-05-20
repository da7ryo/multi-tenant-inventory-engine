import { Request, Response } from "express";
import * as tenantsService from "./tenants.service";
import { TenantCreateReqBody } from "./tenants.types";

export function getTenants(_req: Request, res: Response) {
  res.json({ message: "List of Tenant" });
}

export async function createTenant(req: Request, res: Response) {
  const tenant = req.body as TenantCreateReqBody;

  const createdTenant = await tenantsService.createTenant(tenant);
  res.json(createdTenant);
}
