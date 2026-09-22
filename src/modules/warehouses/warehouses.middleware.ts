import type { Request, Response, NextFunction } from "express";
import {
  CreateWarehouseRequestBodyValidator,
  DeleteWarehouseRequestParamsValidator,
  GetWarehousesRequestQueryValidator,
  UpdateWarehouseBodyRequestValidator,
  UpdateWarehouseParamsValidator,
} from "./warehouses.validator";

export function validateGetWarehousesRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedQuery = GetWarehousesRequestQueryValidator.parse(req.query);

  res.locals.reqQuery = parsedQuery;
  next();
}

export function validateCreateWarehouseRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedBody = CreateWarehouseRequestBodyValidator.parse(req.body);

  res.locals.reqBody = parsedBody;
  next();
}

export function validateUpdateWarehouseRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedParams = UpdateWarehouseParamsValidator.parse(req.params);
  const parsedBody = UpdateWarehouseBodyRequestValidator.parse(req.body);

  res.locals.reqParams = parsedParams;
  res.locals.reqBody = parsedBody;
  next();
}

export function validateDeleteWarehouseRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedParams = DeleteWarehouseRequestParamsValidator.parse(req.params);

  res.locals.reqParams = parsedParams;
  next();
}
