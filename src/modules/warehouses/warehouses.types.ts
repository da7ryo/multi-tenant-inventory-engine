import { z } from "../../shared/shared.validator";
import {
  CreateWarehouseRequestBodyValidator,
  DeleteWarehouseRequestParamsValidator,
  GetWarehousesRequestQueryValidator,
  UpdateWarehouseBodyRequestValidator,
  UpdateWarehouseParamsValidator,
} from "./warehouses.validator";

export type GetWarehousesRequestQuery = z.infer<
  typeof GetWarehousesRequestQueryValidator
>;

export type CreateWarehouseRequestBody = z.infer<
  typeof CreateWarehouseRequestBodyValidator
>;

export type UpdateWarehouseParams = z.infer<
  typeof UpdateWarehouseParamsValidator
>;

export type UpdateWarehouseBody = z.infer<
  typeof UpdateWarehouseBodyRequestValidator
>;

export type DeleteWarehouseRequestParams = z.infer<
  typeof DeleteWarehouseRequestParamsValidator
>;
