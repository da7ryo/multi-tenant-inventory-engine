import z from "zod";
import {
  buildQueryFilterFieldValidator,
  buildQuerySortFieldValidator,
} from "../../shared/shared.validator";

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
