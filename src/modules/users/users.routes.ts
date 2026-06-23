import { Router } from "express";
import * as authController from "../auth/auth.cotroller";
export const userRoutes = Router();

userRoutes.post("/login", authController.login);
