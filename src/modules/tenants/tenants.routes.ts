import { Router } from "express";
import { protect } from "../users/users.middleware";
import { createTenant, getTenants } from "./tenants.controller";
import {
  validateCreateTenantRequestInput,
  validateGetTenantsRequestInput,
} from "./tenants.middleware";

export const tenantsRoutes = Router();

tenantsRoutes.get("/", protect, validateGetTenantsRequestInput, getTenants);

tenantsRoutes.post(
  "/",
  protect,
  validateCreateTenantRequestInput,
  createTenant,
);
