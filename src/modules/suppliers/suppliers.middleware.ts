import type { Request, Response, NextFunction } from "express";
import {
  CreateSupplierRequestBodyValidator,
  DeleteSupplierRequestParamsValidator,
  GetSuppliersRequestQueryValidator,
  UpdateSupplierBodyRequestValidator,
  UpdateSupplierParamsValidator,
} from "./suppliers.validator";

export function validateGetSuppliersRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedQuery = GetSuppliersRequestQueryValidator.parse(req.query);

  res.locals.reqQuery = parsedQuery;
  next();
}

export function validateCreateSupplierRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedBody = CreateSupplierRequestBodyValidator.parse(req.body);

  res.locals.reqBody = parsedBody;
  next();
}

export function validateUpdateSupplierRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedParams = UpdateSupplierParamsValidator.parse(req.params);
  const parsedBody = UpdateSupplierBodyRequestValidator.parse(req.body);

  res.locals.reqParams = parsedParams;
  res.locals.reqBody = parsedBody;
  next();
}

export function validateDeleteSupplierRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedParams = DeleteSupplierRequestParamsValidator.parse(req.params);

  res.locals.reqParams = parsedParams;
  next();
}
