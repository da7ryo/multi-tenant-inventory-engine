import { NextFunction, Request, Response } from "express";
import {
  roleCreateReqBodyValidator,
  roleGetReqParamsValidator,
  roleUpdateReqBodyValidator,
} from "./roles.validator";

export function validateRoleCreateReqInput(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const parsedBody = roleCreateReqBodyValidator.parse(req.body);
  req.body = parsedBody;
  next();
}

export function validateRoleGetReqInput(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const parsedParams = roleGetReqParamsValidator.parse(req.params);
  req.params = parsedParams;
  next();
}

export function validateRoleUpdateReqInput(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const parsedParams = roleGetReqParamsValidator.parse(req.params);
  req.params = parsedParams;

  const parsedBody = roleUpdateReqBodyValidator.parse(req.body);
  req.body = parsedBody;

  next();
}
