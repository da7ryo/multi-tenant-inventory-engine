import { AppError } from "../../core/error/error.service";
import { HTTP_STATUS_CODE } from "../../core/http/http.constants";
import {
  deleteCategory,
  findCategories,
  findCategoryById,
  insertCategory,
  updateCategory as updateCategoryRepo,
} from "../../core/db/db.repo";
import { dbClient } from "../../singletons";
import { CategoryCreateDb, CategoryUpdateDb } from "../../core/db/db.types";
import { CategoryReadValidator } from "./categories.validator";
import {
  CreateCategoryRequestBody,
  GetCategoriesRequestQuery,
  UpdateCategoryBody,
} from "./categories.types";

export async function getCategories(params: {
  reqQuery: GetCategoriesRequestQuery;
  tenantId: string;
}) {
  const { reqQuery, tenantId } = params;

  const retrievedCategories = await findCategories({
    dbClient,
    options: { ...reqQuery, tenantId },
  });

  return retrievedCategories;
}

export async function getCategory(params: { id: string; tenantId: string }) {
  const { id, tenantId } = params;

  const category = await findCategoryById({
    dbClient,
    options: { id, tenantId },
  });

  if (!category) {
    throw new AppError("Category not found", HTTP_STATUS_CODE.NOT_FOUND);
  }

  const parsedCategory = CategoryReadValidator.parse(category);

  return parsedCategory;
}

export async function createCategory(params: {
  reqBody: CreateCategoryRequestBody;
  tenantId: string;
}) {
  const { reqBody, tenantId } = params;

  const categoryInsertData = {
    ...reqBody,
    tenantId,
  } as CategoryCreateDb;

  const createdCategory = await insertCategory({
    dbClient,
    categoryInsertData,
  });

  const parsedCreatedCategory = CategoryReadValidator.parse(createdCategory);

  return parsedCreatedCategory;
}

export async function updateCategory(params: {
  id: string;
  tenantId: string;
  reqBody: UpdateCategoryBody;
}) {
  const { id, tenantId, reqBody } = params;

  const categoryUpdateData = reqBody as CategoryUpdateDb;

  const updatedCategory = await updateCategoryRepo({
    dbClient,
    options: { id, tenantId },
    categoryUpdateData,
  });

  if (!updatedCategory) {
    throw new AppError("Category not found", HTTP_STATUS_CODE.NOT_FOUND);
  }

  const parsedupdatedCategory = CategoryReadValidator.parse(updatedCategory);

  return parsedupdatedCategory;
}

export async function removeCategory(params: { id: string; tenantId: string }) {
  const { id, tenantId } = params;

  const deletedCategory = await deleteCategory({
    dbClient,
    options: { id, tenantId },
  });

  if (!deletedCategory) {
    throw new AppError("Category not found", HTTP_STATUS_CODE.NOT_FOUND);
  }
}
