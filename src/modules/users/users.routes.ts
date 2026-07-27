import { Router } from "express";
import {
  protect,
  validateLoginUserRequestInput,
  validateRefreshTokenRequestInput,
} from "./users.middleware";
import { getMe, loginUser, refreshToken } from "./users.controller";

export const usersRoutes = Router();

usersRoutes.post("/login", validateLoginUserRequestInput, loginUser);
usersRoutes.get("/me", protect, getMe);
usersRoutes.post(
  "/refresh-token",

  validateRefreshTokenRequestInput,
  refreshToken,
);
