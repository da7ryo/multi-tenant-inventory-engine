import express from "express";
import { parseRequestIdFromRequest } from "./shared/shared.middleware";
import { usersRoutes } from "./modules/users/users.routes";
import cookieParser from "cookie-parser";
import { tenantsRoutes } from "./modules/tenants/tenants.routes";

export function createApp() {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.set("query parser", "extended");

  app.use(parseRequestIdFromRequest);

  app.use("/users", usersRoutes);
  app.use("/tenants", tenantsRoutes);

  return { app };
}
