import z from "zod";
import {
  buildQueryFilterFieldValidator,
  buildQuerySortFieldValidator,
} from "../../shared/shared.validator";
import { HTTP_STATUS_CODE_TEXT } from "../../core/http/http.constants";

export const GetTenantsRequestQueryValidator = z
  .object({
    page: z.coerce.number().optional().default(1),
    size: z.coerce.number().optional().default(20),
    sort: buildQuerySortFieldValidator(
      ["id", "name", "createdAt", "updatedAt"],
      "id",
    ),
    name: buildQueryFilterFieldValidator(z.string()).optional(),
  })
  .openapi("GetTenantsRequestQuery");

export const CreateTenantRequestBodyValidator = z
  .object({
    name: z.string().trim().min(1),
  })
  .openapi("CreateTenantRequestBody");

export const TenantReadValidator = z
  .object({
    id: z.string(),
    name: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .openapi("TenantRead");

export const CreateTenantResponseValidator = z
  .object({
    success: z.literal(HTTP_STATUS_CODE_TEXT.SUCCESS),
    data: TenantReadValidator,
  })
  .openapi("CreateTenantResponse");
