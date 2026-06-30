import { Router } from "express";
import * as tenantsController from "./tenants.controller";
import {
  validateTenantCreateReqInput,
  validateTenantGetReqInput,
  validateTenantUpdateReqInput,
} from "./tenants.middleware";
import * as authController from "../auth/auth.cotroller";
import { PermissionEnum } from "../../core/db";

export const tenantsRoutes = Router();

tenantsRoutes
  .route("/")
  .get(
    authController.protect,
    // @ts-ignore
    authController.restrictTo([PermissionEnum.TenantsRead]),
    tenantsController.getTenants,
  )
  .post(
    authController.protect,
    authController.restrictTo([PermissionEnum.TenantsCreate]),
    validateTenantCreateReqInput,
    tenantsController.createTenant,
  );

tenantsRoutes
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo([
      PermissionEnum.TenantsRead,
      PermissionEnum.TenantsReadSelf,
    ]),
    validateTenantGetReqInput,
    tenantsController.getTenant,
  )
  .patch(
    authController.protect,
    authController.restrictTo([
      PermissionEnum.TenantsUpdate,
      PermissionEnum.TenantsUpdateSelf,
    ]),
    validateTenantUpdateReqInput,
    tenantsController.updateTenant,
  )
  .delete(
    authController.protect,
    authController.restrictTo([PermissionEnum.TenantsDelete]),
    validateTenantGetReqInput,
    tenantsController.deleteTenant,
  );
