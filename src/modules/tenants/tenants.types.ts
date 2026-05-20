import z from "zod";
import { tenantCreateReqBodyValidator } from "./tenants.validator";

export type TenantCreateReqBody = z.infer<typeof tenantCreateReqBodyValidator>;
