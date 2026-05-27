import { Router } from "express";
import * as tenantsController from "./tenants.controller";
import {
  validateTenantCreateReqInput,
  validateTenantGetReqInput,
  validateTenantUpdateReqInput,
} from "./tenants.middleware";

export const tenantsRoutes = Router();

tenantsRoutes
  .route("/")
  .get(tenantsController.getTenants)
  .post(validateTenantCreateReqInput, tenantsController.createTenant);

tenantsRoutes
  .route("/:id")
  .get(validateTenantGetReqInput, tenantsController.getTenant)
  .patch(validateTenantUpdateReqInput, tenantsController.updateTenant);
