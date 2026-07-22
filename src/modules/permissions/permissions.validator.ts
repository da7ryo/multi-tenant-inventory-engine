import { PERMISSION_ACTIONS } from "../../core/db/db.constants";
import { z } from "../../shared/shared.validator";

export const PermissionReadValidator = z
  .object({
    id: z.string(),
    action: z.enum(PERMISSION_ACTIONS),
    description: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .openapi("PermissionRead");

export const PermissionsReadValidator = z
  .array(PermissionReadValidator)
  .openapi("PermissionsRead");
