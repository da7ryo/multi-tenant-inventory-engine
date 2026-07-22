import { RouteConfig, ZodContentObject } from "@asteasolutions/zod-to-openapi";
import { PermissionAction } from "../db/db.types";

export type DocsHttpMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

export interface RegisterRouteParams {
  method: DocsHttpMethod;
  path: string;
  tags: string[];
  description: string;
  body?: NonNullable<ZodContentObject["application/json"]>["schema"];
  params?: NonNullable<RouteConfig["request"]>["params"];
  query?: NonNullable<RouteConfig["request"]>["query"];
  response?: NonNullable<ZodContentObject["application/json"]>["schema"];
  responseDescription: string;
  isProtected?: boolean;
  permissions?: PermissionAction[];
}
