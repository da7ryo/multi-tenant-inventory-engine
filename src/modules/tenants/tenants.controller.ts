import { Request, Response } from "express";
import * as tenantsService from "./tenants.repo";

export function getTenants(_req: Request, res: Response) {
  res.json({ message: "List of Tenant" });
}

export async function createTenant(req: Request, res: Response) {
  await tenantsService.createTenant(req.body);
  res.json({ message: "Tenant created" });
}
