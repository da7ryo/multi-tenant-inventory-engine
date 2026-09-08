import { Router } from "express";
import { protect, restrictTo } from "../users/users.middleware";
import { createTenant, getTenants } from "./tenants.controller";
import {
  validateCreateTenantRequestInput,
  validateGetTenantsRequestInput,
} from "./tenants.middleware";
import { PERMISSION_ACTION } from "../../core/db/db.constants";

export const tenantsRoutes = Router();

tenantsRoutes.get(
  "/",
  protect,
  restrictTo([PERMISSION_ACTION.TenantsReadGlobal]),
  validateGetTenantsRequestInput,
  getTenants,
);

tenantsRoutes.post(
  "/",
  protect,
  restrictTo([PERMISSION_ACTION.TenantsCreateGlobal]),
  validateCreateTenantRequestInput,
  createTenant,
);
