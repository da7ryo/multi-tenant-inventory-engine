import { Request, Response } from "express";
import {
  HTTP_STATUS_CODE,
  HTTP_STATUS_CODE_TEXT,
} from "../../core/http/http.constants";
import * as productsService from "./products.service";
import {
  CreateProductRequestBody,
  DeleteProductRequestParams,
  GetProductsRequestQuery,
  UpdateProductBody,
  UpdateProductParams,
} from "./products.types";

export async function getProducts(req: Request, res: Response) {
  const reqQuery = res.locals.reqQuery as GetProductsRequestQuery;
  const tenantId = req.params.tenantId as string;

  const data = await productsService.getProducts({ reqQuery, tenantId });

  res.json({ success: HTTP_STATUS_CODE_TEXT.SUCCESS, data });
}

export async function getProduct(req: Request, res: Response) {
  const tenantId = req.params.tenantId as string;
  const id = req.params.id as string;

  const data = await productsService.getProduct({ tenantId, id });

  res.json({ success: HTTP_STATUS_CODE_TEXT.SUCCESS, data });
}

export async function createProduct(req: Request, res: Response) {
  const reqBody = res.locals.reqBody as CreateProductRequestBody;
  const tenantId = req.params.tenantId as string;

  const data = await productsService.addProduct({ reqBody, tenantId });

  res.status(HTTP_STATUS_CODE.CREATED).json({
    success: HTTP_STATUS_CODE_TEXT.SUCCESS,
    data,
  });
}

export async function updateProduct(req: Request, res: Response) {
  const reqParams = res.locals.reqParams as UpdateProductParams;
  const reqBody = res.locals.reqBody as UpdateProductBody;

  const data = await productsService.updateProductById({
    id: reqParams.id,
    tenantId: req.params.tenantId as string,
    reqBody,
  });

  res.json({ success: HTTP_STATUS_CODE_TEXT.SUCCESS, data });
}

export async function deleteProduct(req: Request, res: Response) {
  const reqParams = res.locals.reqParams as DeleteProductRequestParams;

  await productsService.removeProduct({
    id: reqParams.id,
    tenantId: req.params.tenantId as string,
  });

  res.status(HTTP_STATUS_CODE.NO_CONTENT).send();
}
