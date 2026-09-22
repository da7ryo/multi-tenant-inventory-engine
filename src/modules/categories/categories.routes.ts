import { Router } from "express";
import { protect, restrictTo } from "../users/users.middleware";
import {
  PERMISSION_ACTION,
  PERMISSION_ACTIONS,
} from "../../core/db/db.constants";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "./categories.controller";
import {
  validateCreateCategoryRequestInput,
  validateDeleteCategoryRequestInput,
  validateGetCategoriesRequestInput,
  validateUpdateCategoryRequestInput,
} from "./categories.middleware";

export const categoriesRoutes = Router();

categoriesRoutes.get(
  "/:tenantId",
  protect,
  restrictTo([PERMISSION_ACTION.CategoriesReadTenant]),
  validateGetCategoriesRequestInput,
  getCategories,
);

categoriesRoutes.post(
  "/:tenantId",
  protect,
  restrictTo([
    PERMISSION_ACTION.CategoriesCreateTenant,
    PERMISSION_ACTION.CategoriesCreateGlobal,
  ]),
  validateCreateCategoryRequestInput,
  createCategory,
);

categoriesRoutes.get(
  "/:tenantId/:id",
  protect,
  restrictTo([PERMISSION_ACTION.CategoriesReadTenant]),
  getCategory,
);

categoriesRoutes.patch(
  "/:tenantId/:id",
  protect,
  restrictTo([PERMISSION_ACTION.CategoriesUpdateTenant]),
  validateUpdateCategoryRequestInput,
  updateCategory,
);

categoriesRoutes.delete(
  "/:tenantId/:id",
  protect,
  restrictTo([PERMISSION_ACTION.CategoriesDeleteTenant]),
  validateDeleteCategoryRequestInput,
  deleteCategory,
);
