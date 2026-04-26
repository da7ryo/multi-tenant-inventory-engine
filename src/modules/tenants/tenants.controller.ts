import { Request, Response } from "express";

export function getTenants(_req: Request, res: Response) {
  res.json({ message: "List of Tenant" });
}

export function createTenant(req: Request, res: Response) {
  console.log(req.body);
  res.json({ message: "Tenant created" });
}
