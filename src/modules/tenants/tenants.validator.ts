import { string, z } from "zod";

export const tenantCreateReqBodyValidator = z.object({
  name: z.string().min(1, "Name must at least have one letter"),
});

export const tenantGetReqParamsValidator = z.object({
  id: string(),
});

export const tenantUpdateReqBodyValidator = z.object({
  name: string().min(1, "Name must at least have one letter").optional(),
});
