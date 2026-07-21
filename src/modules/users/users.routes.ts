import { Router } from "express";

export const usersRoutes = Router();

usersRoutes.post("/login", authController.login);
