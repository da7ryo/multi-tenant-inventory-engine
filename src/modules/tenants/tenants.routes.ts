import { Router } from "express";
import * as tenantsController from "./tenants.controller";
import { validateTenantCreateReqBody } from "./tenants.middleware";

export const tenantsRoutes = Router();

tenantsRoutes
  .route("/")
  .get(tenantsController.getTenants)
  .post(validateTenantCreateReqBody, tenantsController.createTenant);
