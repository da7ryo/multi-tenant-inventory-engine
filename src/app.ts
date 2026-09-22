import express from "express";
import { parseRequestIdFromRequest } from "./shared/shared.middleware";
import { usersRoutes } from "./modules/users/users.routes";
import cookieParser from "cookie-parser";
import { tenantsRoutes } from "./modules/tenants/tenants.routes";
import { categoriesRoutes } from "./modules/categories/categories.routes";
import { productsRoutes } from "./modules/products/products.routes";
import { warehousesRoutes } from "./modules/warehouses/warehouses.routes";
import { suppliersRoutes } from "./modules/suppliers/suppliers.routes";

export function createApp() {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.set("query parser", "extended");

  app.use(parseRequestIdFromRequest);

  app.use("/users", usersRoutes);
  app.use("/tenants", tenantsRoutes);
  app.use("/categories", categoriesRoutes);
  app.use("/products", productsRoutes);
  app.use("/warehouses", warehousesRoutes);
  app.use("/suppliers", suppliersRoutes);

  return { app };
}
