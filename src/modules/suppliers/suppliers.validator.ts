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

export const SupplierReadValidator = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    address: z.string().nullable(),
    isActive: z.boolean(),
    tenantId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .openapi("SupplierRead");

export const GetSuppliersRequestQueryValidator = z
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
    email: buildQueryFilterFieldValidator(z.string()).optional(),
    phone: buildQueryFilterFieldValidator(z.string()).optional(),
    isActive: buildQueryFilterFieldValidator(QueryBooleanValidator).optional(),
  })
  .openapi("GetSuppliersRequestQuery");

export const CreateSupplierRequestBodyValidator = z
  .object({
    name: z.string().trim().min(1),
    email: z.string().trim().email().optional(),
    phone: z.string().trim().optional(),
    address: z.string().trim().optional(),
    isActive: z.boolean().optional(),
  })
  .strict()
  .openapi("CreateSupplierRequestBody");

export const UpdateSupplierParamsValidator = z
  .object({
    id: z.string().min(1),
  })
  .openapi("UpdateSupplierParams");

export const UpdateSupplierBodyRequestValidator = z
  .object({
    name: z.string().trim().min(1).optional(),
    email: z.string().trim().email().optional(),
    phone: z.string().trim().optional(),
    address: z.string().trim().optional(),
    isActive: z.boolean().optional(),
  })
  .strict()
  .openapi("UpdateSupplierBodyRequest");

export const DeleteSupplierRequestParamsValidator = z
  .object({
    id: z.string().min(1),
  })
  .openapi("DeleteSupplierRequestParams");
