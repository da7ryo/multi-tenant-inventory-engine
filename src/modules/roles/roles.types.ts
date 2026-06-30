import z from "zod";
import {
  roleCreateReqBodyValidator,
  roleGetReqParamsValidator,
} from "./roles.validator";

export type RoleCreateReqBody = z.infer<typeof roleCreateReqBodyValidator>;
export type RoleGetReqParams = z.infer<typeof roleGetReqParamsValidator>;
