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

export const WarehouseReadValidator = z
  .object({
    id: z.string(),
    name: z.string(),
    address: z.string().nullable(),
    isActive: z.boolean(),
    tenantId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .openapi("WarehouseRead");

export const GetWarehousesRequestQueryValidator = z
  .object({
    page: z.coerce.number().optional().default(1),
    size: z.coerce.number().optional().default(20),
    sort: buildQuerySortFieldValidator(
      ["id", "name", "createdAt", "updatedAt"],
      "name",
    ),
    name: buildQueryFilterFieldValidator(z.string()).optional(),
    id: buildQueryFilterFieldValidator(z.string()).optional(),
    address: buildQueryFilterFieldValidator(z.string()).optional(),
    isActive: buildQueryFilterFieldValidator(QueryBooleanValidator).optional(),
  })
  .openapi("GetWarehousesRequestQuery");

export const CreateWarehouseRequestBodyValidator = z
  .object({
    name: z.string().trim().min(1),
    address: z.string().trim().optional(),
    isActive: z.boolean().optional(),
  })
  .strict()
  .openapi("CreateWarehouseRequestBody");

export const UpdateWarehouseParamsValidator = z
  .object({
    id: z.string().min(1),
  })
  .openapi("UpdateWarehouseParams");

export const UpdateWarehouseBodyRequestValidator = z
  .object({
    name: z.string().trim().min(1).optional(),
    address: z.string().trim().optional(),
    isActive: z.boolean().optional(),
  })
  .strict()
  .openapi("UpdateWarehouseBodyRequest");

export const DeleteWarehouseRequestParamsValidator = z
  .object({
    id: z.string().min(1),
  })
  .openapi("DeleteWarehouseRequestParams");
