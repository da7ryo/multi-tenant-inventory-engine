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
    authController.restrictTo(PermissionEnum.TenantsRead),
    tenantsController.getTenants,
  )
  .post(validateTenantCreateReqInput, tenantsController.createTenant);

tenantsRoutes
  .route("/:id")
  .get(validateTenantGetReqInput, tenantsController.getTenant)
  .patch(validateTenantUpdateReqInput, tenantsController.updateTenant)
  .delete(validateTenantGetReqInput, tenantsController.deleteTenant);
