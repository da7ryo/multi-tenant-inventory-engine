import { Router } from "express";
import { validateLoginUserRequestInput } from "./users.middleware";
import { loginUser } from "./users.controller";

export const usersRoutes = Router();

usersRoutes.post("/login", validateLoginUserRequestInput, loginUser);
