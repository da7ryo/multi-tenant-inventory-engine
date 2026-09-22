import { z } from "../../shared/shared.validator";
import {
  CreateCategoryRequestBodyValidator,
  GetCategoriesRequestQueryValidator,
  UpdateCategoryParamsValidator,
  UpdateCategoryBodyRequestValidator,
  DeleteCategoryRequestParamsValidator,
} from "./categories.validator";

export type GetCategoriesRequestQuery = z.infer<
  typeof GetCategoriesRequestQueryValidator
>;

export type CreateCategoryRequestBody = z.infer<
  typeof CreateCategoryRequestBodyValidator
>;

export type UpdateCategoryParams = z.infer<
  typeof UpdateCategoryParamsValidator
>;

export type UpdateCategoryBody = z.infer<
  typeof UpdateCategoryBodyRequestValidator
>;

export type DeleteCategoryRequestParams = z.infer<
  typeof DeleteCategoryRequestParamsValidator
>;
