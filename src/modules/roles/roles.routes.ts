import { Router } from "express";
import * as rolesController from "./roles.controller";
import {
  validateRoleCreateReqInput,
  validateRoleGetReqInput,
} from "./roles.middleware";
import * as authController from "../auth/auth.cotroller";
import { PermissionEnum } from "../../core/db";

export const rolesRoutes = Router();

rolesRoutes
  .route("/")
  .get(
    authController.protect,
    // @ts-ignore
    authController.restrictTo([
      PermissionEnum.RolesRead,
      PermissionEnum.RolesReadSelf,
    ]),
    rolesController.getRoles,
  )
  .post(
    authController.protect,
    authController.restrictTo([
      PermissionEnum.RolesCreate,
      PermissionEnum.RolesCreateSelf,
    ]),
    validateRoleCreateReqInput,
    rolesController.createRole,
  );

rolesRoutes
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo([
      PermissionEnum.RolesRead,
      PermissionEnum.RolesReadSelf,
    ]),
    validateRoleGetReqInput,
    rolesController.getRole,
  );
