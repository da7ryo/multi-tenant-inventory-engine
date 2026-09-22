import { Router } from "express";
import { protect, restrictTo } from "../users/users.middleware";
import { PERMISSION_ACTION } from "../../core/db/db.constants";
import {
  createWarehouse,
  deleteWarehouse,
  getWarehouse,
  getWarehouses,
  updateWarehouse,
} from "./warehouses.controller";
import {
  validateCreateWarehouseRequestInput,
  validateDeleteWarehouseRequestInput,
  validateGetWarehousesRequestInput,
  validateUpdateWarehouseRequestInput,
} from "./warehouses.middleware";

export const warehousesRoutes = Router();

warehousesRoutes.get(
  "/:tenantId",
  protect,
  restrictTo([PERMISSION_ACTION.WarehousesReadTenant]),
  validateGetWarehousesRequestInput,
  getWarehouses,
);

warehousesRoutes.post(
  "/:tenantId",
  protect,
  restrictTo([PERMISSION_ACTION.WarehousesCreateTenant]),
  validateCreateWarehouseRequestInput,
  createWarehouse,
);

warehousesRoutes.get(
  "/:tenantId/:id",
  protect,
  restrictTo([PERMISSION_ACTION.WarehousesReadTenant]),
  getWarehouse,
);

warehousesRoutes.patch(
  "/:tenantId/:id",
  protect,
  restrictTo([PERMISSION_ACTION.WarehousesUpdateTenant]),
  validateUpdateWarehouseRequestInput,
  updateWarehouse,
);

warehousesRoutes.delete(
  "/:tenantId/:id",
  protect,
  restrictTo([PERMISSION_ACTION.WarehousesDeleteTenant]),
  validateDeleteWarehouseRequestInput,
  deleteWarehouse,
);
