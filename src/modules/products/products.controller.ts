import { Request, Response } from "express";

export function getProducts(_req: Request, res: Response) {
  res.json({ message: "List of products" });
}
