import express from "express";
import { parseRequestIdFromRequest } from "./shared/shared.middleware";
import { usersRoutes } from "./modules/users/users.routes";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use(parseRequestIdFromRequest);

  app.use("/users", usersRoutes);

  return { app };
}
