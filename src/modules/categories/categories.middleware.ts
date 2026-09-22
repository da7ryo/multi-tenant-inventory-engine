import type { Request, Response, NextFunction } from "express";
import {
  CreateCategoryRequestBodyValidator,
  DeleteCategoryRequestParamsValidator,
  GetCategoriesRequestQueryValidator,
  UpdateCategoryBodyRequestValidator,
  UpdateCategoryParamsValidator,
} from "./categories.validator";

export function validateGetCategoriesRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedQuery = GetCategoriesRequestQueryValidator.parse(req.query);

  res.locals.reqQuery = parsedQuery;
  next();
}

export function validateCreateCategoryRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedBody = CreateCategoryRequestBodyValidator.parse(req.body);

  res.locals.reqBody = parsedBody;
  next();
}

export function validateUpdateCategoryRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedParams = UpdateCategoryParamsValidator.parse(req.params);
  const parsedBody = UpdateCategoryBodyRequestValidator.parse(req.body);

  res.locals.reqParams = parsedParams;
  res.locals.reqBody = parsedBody;
  next();
}

export function validateDeleteCategoryRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedParams = DeleteCategoryRequestParamsValidator.parse(req.params);

  res.locals.reqParams = parsedParams;
  next();
}
