import { Router } from "express";
import * as tenantsController from "./tenants.controller";

export const tenantsRoutes = Router();

tenantsRoutes
  .route("/")
  .get(tenantsController.getTenants)
  .post(tenantsController.createTenant);
