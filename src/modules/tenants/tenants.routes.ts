import { Router } from "express";
import * as tenantsController from "./tenants.controller";
import {
  validateTenantCreateReqInput,
  validateTenantGetReqInput,
  validateTenantUpdateReqInput,
} from "./tenants.middleware";
import * as authController from "../auth/auth.cotroller";

export const tenantsRoutes = Router();

tenantsRoutes
  .route("/")
  .get(authController.protect, tenantsController.getTenants)
  .post(validateTenantCreateReqInput, tenantsController.createTenant);

tenantsRoutes
  .route("/:id")
  .get(validateTenantGetReqInput, tenantsController.getTenant)
  .patch(validateTenantUpdateReqInput, tenantsController.updateTenant)
  .delete(validateTenantGetReqInput, tenantsController.deleteTenant);
