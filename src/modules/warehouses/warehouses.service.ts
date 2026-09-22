import { AppError } from "../../core/error/error.service";
import { HTTP_STATUS_CODE } from "../../core/http/http.constants";
import { dbClient } from "../../singletons";
import {
  createWarehouse,
  deleteWarehouse,
  findWarehouseById,
  findWarehouses,
  updateWarehouse,
} from "../../core/db/db.repo";
import { WarehouseCreateDb, UpdateWarehouseDb } from "../../core/db/db.types";
import {
  CreateWarehouseRequestBody,
  GetWarehousesRequestQuery,
  UpdateWarehouseBody,
} from "./warehouses.types";
import { WarehouseReadValidator } from "./warehouses.validator";

export async function getWarehouses(params: {
  reqQuery: GetWarehousesRequestQuery;
  tenantId: string;
}) {
  const { reqQuery, tenantId } = params;

  return await findWarehouses({
    dbClient,
    options: { ...reqQuery, sort: reqQuery.sort ?? ["name"], tenantId },
  });
}

export async function getWarehouse(params: { id: string; tenantId: string }) {
  const { id, tenantId } = params;

  const warehouse = await findWarehouseById({
    dbClient,
    options: { id, tenantId },
  });

  if (!warehouse) {
    throw new AppError("Warehouse not found", HTTP_STATUS_CODE.NOT_FOUND);
  }

  const parsedWarehouse = WarehouseReadValidator.parse(warehouse);

  return parsedWarehouse;
}

export async function addWarehouse(params: {
  reqBody: CreateWarehouseRequestBody;
  tenantId: string;
}) {
  const { reqBody, tenantId } = params;

  const warehouseInsertData: WarehouseCreateDb = {
    ...reqBody,
    tenantId,
  };

  const createdWarehouse = await createWarehouse({
    dbClient,
    warehouseInsertData,
  });

  const parsedCreatedWarehouse = WarehouseReadValidator.parse(createdWarehouse);

  return parsedCreatedWarehouse;
}

export async function updateWarehouseById(params: {
  id: string;
  tenantId: string;
  reqBody: UpdateWarehouseBody;
}) {
  const { id, tenantId, reqBody } = params;

  const updateWarehouseData: UpdateWarehouseDb = reqBody;

  const updatedWarehouse = await updateWarehouse({
    dbClient,
    options: { id, tenantId },
    updateWarehouseData,
  });

  if (!updatedWarehouse) {
    throw new AppError("Warehouse not found", HTTP_STATUS_CODE.NOT_FOUND);
  }

  const parsedUpdatedWarehouse = WarehouseReadValidator.parse(updatedWarehouse);

  return parsedUpdatedWarehouse;
}

export async function removeWarehouse(params: {
  id: string;
  tenantId: string;
}) {
  const { id, tenantId } = params;

  const deletedWarehouse = await deleteWarehouse({
    dbClient,
    options: { id, tenantId },
  });

  if (!deletedWarehouse) {
    throw new AppError("Warehouse not found", HTTP_STATUS_CODE.NOT_FOUND);
  }
}
