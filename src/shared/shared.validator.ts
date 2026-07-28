import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

// Validator
extendZodWithOpenApi(z);

export { z };

export function buildCsvArrayValidator<T extends z.ZodTypeAny>(validator: T) {
  return z.preprocess((val) => {
    if (typeof val === "string") {
      return val.split(",").map((item) => item.trim());
    }
    return val;
  }, z.array(validator));
}

export function buildQueryFilterFieldValidator<T extends z.ZodTypeAny>(
  validator: T,
) {
  return z.union([
    validator,
    z.object({
      eq: validator.optional(),
      ne: validator.optional(),
      gt: validator.optional(),
      gte: validator.optional(),
      lt: validator.optional(),
      lte: validator.optional(),
      like: validator.optional(),
      ilike: validator.optional(),
      in: buildCsvArrayValidator(validator).optional(),
      nin: buildCsvArrayValidator(validator).optional(),
    }),
  ]);
}

export function buildQuerySortFieldValidator<T extends string>(
  allowedFields: readonly T[],
  defaultSort: string,
) {
  const allowedSortValues = allowedFields.flatMap((field) => [
    field,
    `-${field}`,
  ]);

  const sortEnum = z.enum(allowedSortValues);

  return z.preprocess(
    (val) => {
      if (val === undefined || val === null || val === "") {
        return defaultSort.split(",").map((item) => item.trim());
      }

      if (typeof val === "string") {
        return val.split(",").map((item) => item.trim());
      }

      return val;
    },

    z.array(sortEnum).default([defaultSort]),
  );
}
