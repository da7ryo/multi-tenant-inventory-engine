import { Router } from "express";
import { protect, restrictTo } from "../users/users.middleware";
import { PERMISSION_ACTION } from "../../core/db/db.constants";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./products.controller";
import {
  validateCreateProductRequestInput,
  validateDeleteProductRequestInput,
  validateGetProductsRequestInput,
  validateUpdateProductRequestInput,
} from "./products.middleware";

export const productsRoutes = Router();

productsRoutes.get(
  "/:tenantId",
  protect,
  restrictTo([PERMISSION_ACTION.ProductsReadTenant]),
  validateGetProductsRequestInput,
  getProducts,
);

productsRoutes.post(
  "/:tenantId",
  protect,
  restrictTo([PERMISSION_ACTION.ProductsCreateTenant]),
  validateCreateProductRequestInput,
  createProduct,
);

productsRoutes.get(
  "/:tenantId/:id",
  protect,
  restrictTo([PERMISSION_ACTION.ProductsReadTenant]),
  getProduct,
);

productsRoutes.patch(
  "/:tenantId/:id",
  protect,
  restrictTo([PERMISSION_ACTION.ProductsUpdateTenant]),
  validateUpdateProductRequestInput,
  updateProduct,
);

productsRoutes.delete(
  "/:tenantId/:id",
  protect,
  restrictTo([PERMISSION_ACTION.ProductsDeleteTenant]),
  validateDeleteProductRequestInput,
  deleteProduct,
);
