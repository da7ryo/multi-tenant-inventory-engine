import { Request, Response } from "express";

export function getWarehouses(_req: Request, res: Response) {
  res.json({ message: "List of Warehouses" });
}
