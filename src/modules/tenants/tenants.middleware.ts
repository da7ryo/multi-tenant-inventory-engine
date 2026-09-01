import type { Request, Response, NextFunction } from "express";
import {
  CreateTenantRequestBodyValidator,
  GetTenantsRequestQueryValidator,
} from "./tenants.validator";

export function validateGetTenantsRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedQuery = GetTenantsRequestQueryValidator.parse(req.query);

  res.locals.reqQuery = parsedQuery;
  next();
}

export function validateCreateTenantRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedBody = CreateTenantRequestBodyValidator.parse(req.body);

  res.locals.reqBody = parsedBody;

  next();
}
