import type { Request, Response, NextFunction } from "express";
import { GetTenantsRequestQueryValidator } from "./tenants.validator";

export function validateGetTenantsRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedQuery = GetTenantsRequestQueryValidator.parse(req.query);

  res.locals.reqQuery = parsedQuery;
  next();
}
