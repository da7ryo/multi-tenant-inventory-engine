import { z } from "../../shared/shared.validator";
import {
  buildQueryFilterFieldValidator,
  buildQuerySortFieldValidator,
} from "../../shared/shared.validator";

const QueryBooleanValidator = z.preprocess((value) => {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return value;
}, z.boolean());

export const ProductReadValidator = z
  .object({
    id: z.string(),
    sku: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    unitOfMeasure: z.string(),
    isActive: z.boolean(),
    reorderPoint: z.number(),
    tenantId: z.string(),
    categoryId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .openapi("ProductRead");

export const GetProductsRequestQueryValidator = z
  .object({
    page: z.coerce.number().optional().default(1),
    size: z.coerce.number().optional().default(20),
    sort: buildQuerySortFieldValidator(
      ["id", "sku", "name", "createdAt", "updatedAt"],
      "name",
    ),
    sku: buildQueryFilterFieldValidator(z.string()).optional(),
    name: buildQueryFilterFieldValidator(z.string()).optional(),
    isActive: buildQueryFilterFieldValidator(QueryBooleanValidator).optional(),
    categoryId: buildQueryFilterFieldValidator(z.string()).optional(),
  })
  .openapi("GetProductsRequestQuery");

export const CreateProductRequestBodyValidator = z
  .object({
    sku: z.string().trim().min(1),
    name: z.string().trim().min(1),
    description: z.string().trim().optional(),
    unitOfMeasure: z.string().trim().min(1).optional(),
    isActive: z.boolean().optional(),
    reorderPoint: z.number().int().min(0).optional(),
    categoryId: z.string().min(1).nullable().optional(),
  })
  .strict()
  .openapi("CreateProductRequestBody");

export const UpdateProductParamsValidator = z
  .object({
    id: z.string().min(1),
  })
  .openapi("UpdateProductParams");

export const UpdateProductBodyRequestValidator = z
  .object({
    sku: z.string().trim().min(1).optional(),
    name: z.string().trim().min(1).optional(),
    description: z.string().trim().optional(),
    unitOfMeasure: z.string().trim().min(1).optional(),
    isActive: z.boolean().optional(),
    reorderPoint: z.number().int().min(0).optional(),
    categoryId: z.string().min(1).nullable().optional(),
  })
  .strict()
  .openapi("UpdateProductBodyRequest");

export const DeleteProductRequestParamsValidator = z
  .object({
    id: z.string().min(1),
  })
  .openapi("DeleteProductRequestParams");
