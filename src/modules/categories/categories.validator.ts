import { z } from "../../shared/shared.validator";
import {
  buildQuerySortFieldValidator,
  buildQueryFilterFieldValidator,
} from "../../shared/shared.validator";

export const CategoryReadValidator = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    tenantId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .openapi("CategoryRead");

export const GetCategoriesRequestQueryValidator = z
  .object({
    page: z.coerce.number().optional().default(1),
    size: z.coerce.number().optional().default(20),
    sort: buildQuerySortFieldValidator(
      ["id", "name", "createdAt", "updatedAt"],
      "name",
    ),
    name: buildQueryFilterFieldValidator(z.string()).optional(),
  })
  .openapi("GetCategoriesRequestQuery");

export const CreateCategoryRequestBodyValidator = z
  .object({
    name: z.string().trim().min(1),
    description: z.string().trim().optional(),
  })
  .strict()
  .openapi("CreateCategoryRequestBody");

export const UpdateCategoryParamsValidator = z
  .object({
    id: z.string().min(1),
  })
  .openapi("UpdateCategoryParams");

export const UpdateCategoryBodyRequestValidator = z
  .object({
    name: z.string().trim().min(1).optional(),
    description: z.string().trim().optional(),
  })
  .strict()
  .openapi("UpdateCategoryBodyRequest");

export const DeleteCategoryRequestParamsValidator = z
  .object({
    id: z.string().min(1),
  })
  .openapi("DeleteCategoryRequestParams");
