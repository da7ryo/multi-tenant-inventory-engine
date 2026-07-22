import { z } from "../../shared/shared.validator";
import {
  PermissionsReadValidator,
  PermissionReadValidator,
} from "./permissions.validator";

export type PermissionRead = z.infer<typeof PermissionReadValidator>;

export type PermissionsRead = z.infer<typeof PermissionsReadValidator>;
