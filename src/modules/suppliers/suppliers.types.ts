import { z } from "../../shared/shared.validator";
import {
  CreateSupplierRequestBodyValidator,
  DeleteSupplierRequestParamsValidator,
  GetSuppliersRequestQueryValidator,
  UpdateSupplierBodyRequestValidator,
  UpdateSupplierParamsValidator,
} from "./suppliers.validator";

export type GetSuppliersRequestQuery = z.infer<
  typeof GetSuppliersRequestQueryValidator
>;

export type CreateSupplierRequestBody = z.infer<
  typeof CreateSupplierRequestBodyValidator
>;

export type UpdateSupplierParams = z.infer<
  typeof UpdateSupplierParamsValidator
>;

export type UpdateSupplierBody = z.infer<
  typeof UpdateSupplierBodyRequestValidator
>;

export type DeleteSupplierRequestParams = z.infer<
  typeof DeleteSupplierRequestParamsValidator
>;
