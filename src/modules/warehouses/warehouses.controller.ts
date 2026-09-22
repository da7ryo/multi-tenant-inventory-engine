import { Request, Response } from "express";
import {
  HTTP_STATUS_CODE,
  HTTP_STATUS_CODE_TEXT,
} from "../../core/http/http.constants";
import * as warehousesService from "./warehouses.service";
import {
  CreateWarehouseRequestBody,
  DeleteWarehouseRequestParams,
  GetWarehousesRequestQuery,
  UpdateWarehouseBody,
  UpdateWarehouseParams,
} from "./warehouses.types";

export async function getWarehouses(req: Request, res: Response) {
  const reqQuery = res.locals.reqQuery as GetWarehousesRequestQuery;
  const tenantId = req.params.tenantId as string;

  const data = await warehousesService.getWarehouses({ reqQuery, tenantId });

  res.json({ success: HTTP_STATUS_CODE_TEXT.SUCCESS, data });
}

export async function getWarehouse(req: Request, res: Response) {
  const tenantId = req.params.tenantId as string;
  const id = req.params.id as string;

  const data = await warehousesService.getWarehouse({ tenantId, id });

  res.json({ success: HTTP_STATUS_CODE_TEXT.SUCCESS, data });
}

export async function createWarehouse(req: Request, res: Response) {
  const reqBody = res.locals.reqBody as CreateWarehouseRequestBody;
  const tenantId = req.params.tenantId as string;

  const data = await warehousesService.addWarehouse({ reqBody, tenantId });

  res.status(HTTP_STATUS_CODE.CREATED).json({
    success: HTTP_STATUS_CODE_TEXT.SUCCESS,
    data,
  });
}

export async function updateWarehouse(req: Request, res: Response) {
  const reqParams = res.locals.reqParams as UpdateWarehouseParams;
  const reqBody = res.locals.reqBody as UpdateWarehouseBody;

  const data = await warehousesService.updateWarehouseById({
    id: reqParams.id,
    tenantId: req.params.tenantId as string,
    reqBody,
  });

  res.json({ success: HTTP_STATUS_CODE_TEXT.SUCCESS, data });
}

export async function deleteWarehouse(req: Request, res: Response) {
  const reqParams = res.locals.reqParams as DeleteWarehouseRequestParams;

  await warehousesService.removeWarehouse({
    id: reqParams.id,
    tenantId: req.params.tenantId as string,
  });

  res.status(HTTP_STATUS_CODE.NO_CONTENT).send();
}
