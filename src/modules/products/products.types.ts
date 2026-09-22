import { z } from "../../shared/shared.validator";
import {
  CreateProductRequestBodyValidator,
  DeleteProductRequestParamsValidator,
  GetProductsRequestQueryValidator,
  UpdateProductBodyRequestValidator,
  UpdateProductParamsValidator,
} from "./products.validator";

export type GetProductsRequestQuery = z.infer<
  typeof GetProductsRequestQueryValidator
>;

export type CreateProductRequestBody = z.infer<
  typeof CreateProductRequestBodyValidator
>;

export type UpdateProductParams = z.infer<typeof UpdateProductParamsValidator>;

export type UpdateProductBody = z.infer<
  typeof UpdateProductBodyRequestValidator
>;

export type DeleteProductRequestParams = z.infer<
  typeof DeleteProductRequestParamsValidator
>;
