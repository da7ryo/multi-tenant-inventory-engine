import "dotenv/config";
import express from "express";
import { productsRoutes } from "./modules/products/products.routes";
import { warehousesRoutes } from "./modules/warehouses/warehouses.routes";
import { tenantsRoutes } from "./modules/tenants/tenants.routes";
import { errorMiddleware } from "./core/error";
import { userRoutes } from "./modules/users/users.routes";
import { rolesRoutes } from "./modules/roles/roles.routes";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.use("/users", userRoutes);
app.use("/tenants", tenantsRoutes);
app.use("/roles", rolesRoutes);
app.use("/warehouses", warehousesRoutes);
app.use("/products", productsRoutes);

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log("Server started");
});
