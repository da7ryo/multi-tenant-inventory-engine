import "dotenv/config";
import express from "express";
import { productsRoutes } from "./modules/products/products.routes";
import { warehousesRoutes } from "./modules/warehouses/warehouses.routes";
import { tenantsRoutes } from "./modules/tenants/tenants.routes";
import { CONFIG } from "./core/config";
import { db } from "./core/db";
import { users } from "./core/db/schema";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.use("/tenants", tenantsRoutes);
app.use("/warehouses", warehousesRoutes);
app.use("/products", productsRoutes);

app.listen(8080, () => {
  console.log("Server started");
});
