import { string, z } from "zod";

export const roleCreateReqBodyValidator = z.object({
  name: z
    .string("Name is required.")
    .min(1, "Name must at least have one letter."),
  tenantId: z.string("tenantId is required"),
  permissions: z.array(z.string().min(1)).min(1),
});

export const roleGetReqParamsValidator = z.object({
  id: string(),
});

export const roleUpdateReqBodyValidator = z.object({
  name: string().min(1, "Name must at least have one letter.").optional(),
});
