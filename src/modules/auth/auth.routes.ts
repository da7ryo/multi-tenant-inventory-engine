import { Router } from "express";
import * as authController from "./auth.cotroller";
export const authRoutes = Router();

authRoutes.route("/").post("/login", authController.login);
