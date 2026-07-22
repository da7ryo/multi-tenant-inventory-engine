import { z } from "../../shared/shared.validator";
import { PermissionsReadValidator } from "../permissions/permissions.validator";

export const RoleReadValidator = z
  .object({
    id: z.string(),
    name: z.string(),
    tenantId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .openapi("RoleRead");

export const RoleWithPermissionsReadValidator = RoleReadValidator.extend({
  permissions: PermissionsReadValidator,
}).openapi("RoleWithPermissionsRead");
