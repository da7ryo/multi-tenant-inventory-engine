import { NextFunction, Request, Response } from "express";
import { tenantCreateReqBodyValidator } from "./tenants.validator";

export function validateTenantCreateReqBody(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const parsedBody = tenantCreateReqBodyValidator.parse(req.body);
  req.body = parsedBody;
  next();
}
