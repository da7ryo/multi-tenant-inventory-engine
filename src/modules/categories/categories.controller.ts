import { Request, Response } from "express";
import {
  HTTP_STATUS_CODE_TEXT,
  HTTP_STATUS_CODE,
} from "../../core/http/http.constants";
import {
  createCategory as createCategoryService,
  getCategories as getCategoriesService,
  getCategory as getCategoryService,
  updateCategory as updateCategoryService,
  removeCategory as removeCategoryService,
} from "./categories.service";
import {
  CreateCategoryRequestBody,
  GetCategoriesRequestQuery,
  UpdateCategoryBody,
  UpdateCategoryParams,
  DeleteCategoryRequestParams,
} from "./categories.types";
import { CategoryReadValidator } from "./categories.validator";

export async function getCategories(req: Request, res: Response) {
  const reqQuery = res.locals.reqQuery as GetCategoriesRequestQuery;
  const tenantId = req.params.tenantId as string;

  const data = await getCategoriesService({ reqQuery, tenantId });

  res.json({ success: HTTP_STATUS_CODE_TEXT.SUCCESS, data });
}

export async function getCategory(req: Request, res: Response) {
  const id = req.params.id as string;
  const tenantId = req.params.tenantId as string;

  const data = await getCategoryService({ id, tenantId });

  res.json({ success: HTTP_STATUS_CODE_TEXT.SUCCESS, data });
}

export async function createCategory(req: Request, res: Response) {
  const reqBody = res.locals.reqBody as CreateCategoryRequestBody;
  const tenantId = req.params.tenantId as string;

  const data = await createCategoryService({ reqBody, tenantId });

  const parsedData = CategoryReadValidator.parse(data);

  res.status(HTTP_STATUS_CODE.CREATED).json({
    success: HTTP_STATUS_CODE_TEXT.SUCCESS,
    data: parsedData,
  });
}

export async function updateCategory(_req: Request, res: Response) {
  const reqParams = res.locals.reqParams as UpdateCategoryParams;
  const reqBody = res.locals.reqBody as UpdateCategoryBody;
  const tenantId = _req.params.tenantId as string;

  const data = await updateCategoryService({
    id: reqParams.id,
    tenantId,
    reqBody,
  });

  res.json({ success: HTTP_STATUS_CODE_TEXT.SUCCESS, data });
}

export async function deleteCategory(req: Request, res: Response) {
  const reqParams = res.locals.reqParams as DeleteCategoryRequestParams;
  const tenantId = req.params.tenantId as string;

  await removeCategoryService({ id: reqParams.id, tenantId });

  res.status(HTTP_STATUS_CODE.NO_CONTENT).send();
}
