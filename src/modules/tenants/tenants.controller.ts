import { Request, Response } from "express";
import { HTTP_STATUS_CODE_TEXT } from "../../core/http/http.constants";

export async function getTenants(_req: Request, res: Response) {
  console.log(res.locals.reqQuery);

  const response = { success: HTTP_STATUS_CODE_TEXT.SUCCESS, data: [] };

  res.json(response);
}
