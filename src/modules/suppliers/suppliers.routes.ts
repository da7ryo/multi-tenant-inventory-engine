import { Router } from "express";
import { protect, restrictTo } from "../users/users.middleware";
import { PERMISSION_ACTION } from "../../core/db/db.constants";
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
} from "./suppliers.controller";
import {
  validateCreateSupplierRequestInput,
  validateDeleteSupplierRequestInput,
  validateGetSuppliersRequestInput,
  validateUpdateSupplierRequestInput,
} from "./suppliers.middleware";

export const suppliersRoutes = Router();

suppliersRoutes.get(
  "/:tenantId",
  protect,
  restrictTo([PERMISSION_ACTION.SuppliersReadTenant]),
  validateGetSuppliersRequestInput,
  getSuppliers,
);

suppliersRoutes.post(
  "/:tenantId",
  protect,
  restrictTo([PERMISSION_ACTION.SuppliersCreateTenant]),
  validateCreateSupplierRequestInput,
  createSupplier,
);

suppliersRoutes.get(
  "/:tenantId/:id",
  protect,
  restrictTo([PERMISSION_ACTION.SuppliersReadTenant]),
  getSupplier,
);

suppliersRoutes.patch(
  "/:tenantId/:id",
  protect,
  restrictTo([PERMISSION_ACTION.SuppliersUpdateTenant]),
  validateUpdateSupplierRequestInput,
  updateSupplier,
);

suppliersRoutes.delete(
  "/:tenantId/:id",
  protect,
  restrictTo([PERMISSION_ACTION.SuppliersDeleteTenant]),
  validateDeleteSupplierRequestInput,
  deleteSupplier,
);
