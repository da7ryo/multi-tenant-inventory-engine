import express from "express";
import { parseRequestIdFromRequest } from "./shared/shared.middleware";
import { usersRoutes } from "./modules/users/users.routes";
import cookieParser from "cookie-parser";

export function createApp() {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  app.use(parseRequestIdFromRequest);

  app.use("/users", usersRoutes);

  return { app };
}
