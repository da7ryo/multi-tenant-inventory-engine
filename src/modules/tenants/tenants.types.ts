import z from "zod";
import {
  tenantCreateReqBodyValidator,
  tenantDeleteReqParamsValidator,
  tenantGetReqParamsValidator,
  tenantUpdateReqBodyValidator,
} from "./tenants.validator";

export type TenantCreateReqBody = z.infer<typeof tenantCreateReqBodyValidator>;
export type TenantGetReqParams = z.infer<typeof tenantGetReqParamsValidator>;
export type TenantUpdateReqBody = z.infer<typeof tenantUpdateReqBodyValidator>;
export type TenantDeleteReqParams = z.infer<
  typeof tenantDeleteReqParamsValidator
>;
