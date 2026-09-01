import { Request, Response } from "express";
import {
  HTTP_STATUS_CODE_TEXT,
  HTTP_STATUS_CODE,
} from "../../core/http/http.constants";
import { CreateTenantRequestBody } from "./tenants.types";
import { createTenant as createTenantService } from "./tenants.service";
import { CreateTenantResponseValidator } from "./tenants.validator";

export async function getTenants(_req: Request, res: Response) {
  console.log(res.locals.reqQuery);

  const response = { success: HTTP_STATUS_CODE_TEXT.SUCCESS, data: [] };

  res.json(response);
}

export async function createTenant(req: Request, res: Response) {
  const reqBody = res.locals.reqBody as CreateTenantRequestBody;

  const data = await createTenantService({
    reqBody,
  });

  const response = {
    success: HTTP_STATUS_CODE_TEXT.SUCCESS,
    data,
  };

  const parsedResponse = CreateTenantResponseValidator.parse(response);

  res.status(HTTP_STATUS_CODE.CREATED).json(parsedResponse);
}
