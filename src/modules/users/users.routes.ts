import { Router } from "express";
import { validateLoginUserRequestInput } from "./users.middleware";

export const usersRoutes = Router();

usersRoutes.post("/login", validateLoginUserRequestInput, authController.login);
