import {
  CreateTenantRequestBodyValidator,
  GetTenantsRequestQueryValidator,
} from "./tenants.validator";
import { z } from "../../shared/shared.validator";

export type GetTenantRequestQuery = z.infer<
  typeof GetTenantsRequestQueryValidator
>;

export type CreateTenantRequestBody = z.infer<
  typeof CreateTenantRequestBodyValidator
>;
