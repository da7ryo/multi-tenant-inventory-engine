import { UserWithRoleAndPermissionsRead } from "../modules/users/users.types";

declare global {
  namespace Express {
    interface Locals {
      requestId: string;
      user?: UserWithRoleAndPermissionsRead;
    }
  }
}
