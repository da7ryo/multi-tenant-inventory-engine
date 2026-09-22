import { Request, Response } from "express";
import {
  HTTP_STATUS_CODE,
  HTTP_STATUS_CODE_TEXT,
} from "../../core/http/http.constants";
import * as suppliersService from "./suppliers.service";
import {
  CreateSupplierRequestBody,
  DeleteSupplierRequestParams,
  GetSuppliersRequestQuery,
  UpdateSupplierBody,
  UpdateSupplierParams,
} from "./suppliers.types";

export async function getSuppliers(req: Request, res: Response) {
  const reqQuery = res.locals.reqQuery as GetSuppliersRequestQuery;
  const tenantId = req.params.tenantId as string;

  const data = await suppliersService.getSuppliers({ reqQuery, tenantId });

  res.json({ success: HTTP_STATUS_CODE_TEXT.SUCCESS, data });
}

export async function getSupplier(req: Request, res: Response) {
  const tenantId = req.params.tenantId as string;
  const id = req.params.id as string;

  const data = await suppliersService.getSupplier({ tenantId, id });

  res.json({ success: HTTP_STATUS_CODE_TEXT.SUCCESS, data });
}

export async function createSupplier(req: Request, res: Response) {
  const reqBody = res.locals.reqBody as CreateSupplierRequestBody;
  const tenantId = req.params.tenantId as string;

  const data = await suppliersService.addSupplier({ reqBody, tenantId });

  res.status(HTTP_STATUS_CODE.CREATED).json({
    success: HTTP_STATUS_CODE_TEXT.SUCCESS,
    data,
  });
}

export async function updateSupplier(req: Request, res: Response) {
  const reqParams = res.locals.reqParams as UpdateSupplierParams;
  const reqBody = res.locals.reqBody as UpdateSupplierBody;

  const data = await suppliersService.updateSupplierById({
    id: reqParams.id,
    tenantId: req.params.tenantId as string,
    reqBody,
  });

  res.json({ success: HTTP_STATUS_CODE_TEXT.SUCCESS, data });
}

export async function deleteSupplier(req: Request, res: Response) {
  const reqParams = res.locals.reqParams as DeleteSupplierRequestParams;

  await suppliersService.removeSupplier({
    id: reqParams.id,
    tenantId: req.params.tenantId as string,
  });

  res.status(HTTP_STATUS_CODE.NO_CONTENT).send();
}
