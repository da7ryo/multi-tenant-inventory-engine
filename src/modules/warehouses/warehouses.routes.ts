import { Router } from "express";
import * as warehousesController from "./warehouses.controller";

export const warehousesRoutes = Router();

warehousesRoutes.get("/", warehousesController.getWarehouses);
