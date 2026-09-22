import type { Request, Response, NextFunction } from "express";
import {
  CreateProductRequestBodyValidator,
  DeleteProductRequestParamsValidator,
  GetProductsRequestQueryValidator,
  UpdateProductBodyRequestValidator,
  UpdateProductParamsValidator,
} from "./products.validator";

export function validateGetProductsRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedQuery = GetProductsRequestQueryValidator.parse(req.query);

  res.locals.reqQuery = parsedQuery;
  next();
}

export function validateCreateProductRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedBody = CreateProductRequestBodyValidator.parse(req.body);

  res.locals.reqBody = parsedBody;
  next();
}

export function validateUpdateProductRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedParams = UpdateProductParamsValidator.parse(req.params);
  const parsedBody = UpdateProductBodyRequestValidator.parse(req.body);

  res.locals.reqParams = parsedParams;
  res.locals.reqBody = parsedBody;
  next();
}

export function validateDeleteProductRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedParams = DeleteProductRequestParamsValidator.parse(req.params);

  res.locals.reqParams = parsedParams;
  next();
}
