import { z } from "zod";

export const tenantCreateReqBodyValidator = z.object({
  name: z.string().min(1, "Name must at least have one letter"),
});
