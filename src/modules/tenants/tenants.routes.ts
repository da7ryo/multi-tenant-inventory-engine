import { Router } from "express";
import { protect } from "../users/users.middleware";
import { getTenants } from "./tenants.controller";
import { validateGetTenantsRequestInput } from "./tenants.middleware";

export const tenantsRoutes = Router();

tenantsRoutes.get("/", protect, validateGetTenantsRequestInput, getTenants);
