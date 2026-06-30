import { Request, Response } from "express";
import * as rolesService from "./roles.service";
import { RoleCreateReqBody, RoleGetReqParams } from "./roles.types";
import { HttpStatusCode } from "../../core/http";

export async function getRoles(_req: Request, res: Response) {
  const roles = await rolesService.getRoles();
  res.json(roles);
}

export async function createRole(req: Request, res: Response) {
  const role = req.body as RoleCreateReqBody;

  const createdRole = await rolesService.createRole(role);
  res.status(HttpStatusCode.CREATED).json(createdRole);
}

export async function getRole(req: Request, res: Response) {
  const { id } = req.params as RoleGetReqParams;
  const role = await rolesService.getRole(id);

  res.status(HttpStatusCode.OK).json(role);
}
