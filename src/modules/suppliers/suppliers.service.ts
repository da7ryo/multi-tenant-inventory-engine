import { AppError } from "../../core/error/error.service";
import { HTTP_STATUS_CODE } from "../../core/http/http.constants";
import { dbClient } from "../../singletons";
import {
  createSupplier,
  deleteSupplier,
  findSupplier,
  findSupplierById,
  updateSupplier,
} from "../../core/db/db.repo";
import { SupplierCreateDb, UpdateSupplierDb } from "../../core/db/db.types";
import {
  CreateSupplierRequestBody,
  GetSuppliersRequestQuery,
  UpdateSupplierBody,
} from "./suppliers.types";
import { SupplierReadValidator } from "./suppliers.validator";

export async function getSuppliers(params: {
  reqQuery: GetSuppliersRequestQuery;
  tenantId: string;
}) {
  const { reqQuery, tenantId } = params;

  return await findSupplier({
    dbClient,
    options: { ...reqQuery, sort: reqQuery.sort ?? ["name"], tenantId },
  });
}

export async function getSupplier(params: { id: string; tenantId: string }) {
  const { id, tenantId } = params;

  const supplier = await findSupplierById({
    dbClient,
    options: { id, tenantId },
  });

  if (!supplier) {
    throw new AppError("Supplier not found", HTTP_STATUS_CODE.NOT_FOUND);
  }

  const parsedSupplier = SupplierReadValidator.parse(supplier);

  return parsedSupplier;
}

export async function addSupplier(params: {
  reqBody: CreateSupplierRequestBody;
  tenantId: string;
}) {
  const { reqBody, tenantId } = params;

  const supplierInsertData: SupplierCreateDb = {
    ...reqBody,
    tenantId,
  };

  const createdSupplier = await createSupplier({
    dbClient,
    supplierInsertData,
  });

  const parsedCreatedSupplier = SupplierReadValidator.parse(createdSupplier);

  return parsedCreatedSupplier;
}

export async function updateSupplierById(params: {
  id: string;
  tenantId: string;
  reqBody: UpdateSupplierBody;
}) {
  const { id, tenantId, reqBody } = params;

  const updateSupplierData: UpdateSupplierDb = reqBody;

  const updatedSupplier = await updateSupplier({
    dbClient,
    options: { id, tenantId },
    updateSupplierData,
  });

  if (!updatedSupplier) {
    throw new AppError("Supplier not found", HTTP_STATUS_CODE.NOT_FOUND);
  }

  const parsedUpdatedSupplier = SupplierReadValidator.parse(updatedSupplier);

  return parsedUpdatedSupplier;
}

export async function removeSupplier(params: { id: string; tenantId: string }) {
  const { id, tenantId } = params;

  const deletedSupplier = await deleteSupplier({
    dbClient,
    options: { id, tenantId },
  });

  if (!deletedSupplier) {
    throw new AppError("Supplier not found", HTTP_STATUS_CODE.NOT_FOUND);
  }
}
