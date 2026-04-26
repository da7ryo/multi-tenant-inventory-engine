import { Router } from "express";
import * as productsController from "./products.controller";

export const productsRoutes = Router();

productsRoutes.get("/", productsController.getProducts);
