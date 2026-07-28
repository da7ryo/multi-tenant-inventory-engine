import { Router } from "express";
import {
  protect,
  validateLoginUserRequestInput,
  validateRefreshTokenRequestInput,
} from "./users.middleware";
import { getMe, loginUser, logoutUser, refreshToken } from "./users.controller";

export const usersRoutes = Router();

usersRoutes.post("/login", validateLoginUserRequestInput, loginUser);

usersRoutes.get("/me", protect, getMe);

usersRoutes.post(
  "/refresh-token",
  validateRefreshTokenRequestInput,
  refreshToken,
);

usersRoutes.post("/logout", logoutUser);
