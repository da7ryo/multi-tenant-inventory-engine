import { z } from "../../shared/shared.validator";
import {
  RoleReadValidator,
  RoleWithPermissionsReadValidator,
} from "./roles.validator";

export type RoleRead = z.infer<typeof RoleReadValidator>;

export type RoleWithPermissionsRead = z.infer<
  typeof RoleWithPermissionsReadValidator
>;
