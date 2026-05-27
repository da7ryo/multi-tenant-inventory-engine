import { NextFunction, Request, Response } from "express";
import {
  tenantCreateReqBodyValidator,
  tenantGetReqParamsValidator,
  tenantUpdateReqBodyValidator,
} from "./tenants.validator";

export function validateTenantCreateReqInput(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const parsedBody = tenantCreateReqBodyValidator.parse(req.body);
  req.body = parsedBody;
  next();
}

export function validateTenantGetReqInput(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const parsedParams = tenantGetReqParamsValidator.parse(req.params);
  req.params = parsedParams;
  next();
}

export function validateTenantUpdateReqInput(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const parsedParams = tenantGetReqParamsValidator.parse(req.params);
  req.params = parsedParams;

  const parsedBody = tenantUpdateReqBodyValidator.parse(req.body);
  req.body = parsedBody;

  next();
}
