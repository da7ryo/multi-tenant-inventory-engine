import { CreateTenantRequestBodyValidator } from "./tenants.validator";
import { z } from "../../shared/shared.validator";

export type CreateTenantRequestBody = z.infer<
  typeof CreateTenantRequestBodyValidator
>;
