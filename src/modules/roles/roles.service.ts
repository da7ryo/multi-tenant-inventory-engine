import { AppError } from "../../core/error/app-error";
import { HttpStatusCode } from "../../core/http";
import { ROLE_ERROR_MESSAGE } from "./roles.constants";
import * as rolesRepo from "./roles.repo";
import { RoleCreateReqBody } from "./roles.types";

export async function getRoles() {
  const roles = await rolesRepo.findRoles();
  return roles;
}

export async function createRole(role: RoleCreateReqBody) {
  const createdRole = await rolesRepo.createRoleWithPermissions(role);
  return createdRole;
}

export async function getRole(id: string) {
  const role = await rolesRepo.findRoleById(id);

  if (!role) {
    throw new AppError(
      ROLE_ERROR_MESSAGE.RoleNotFound,
      HttpStatusCode.NOT_FOUND,
    );
  }
  return role;
}
