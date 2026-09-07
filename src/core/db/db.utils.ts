import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  ilike,
  inArray,
  like,
  lt,
  lte,
  ne,
  notInArray,
  SQL,
} from "drizzle-orm";
import { PgColumn, PgSelect } from "drizzle-orm/pg-core";

export function applyDynamicQuery<T extends PgSelect>(params: {
  baseQuery: T;
  dynamicQueryOptions: {
    page: number;
    size: number;
    sort: string[];
    [key: string]: unknown;
  };
  table: object;
  options?: {
    isCount?: boolean;
  };
}) {
  const { baseQuery, dynamicQueryOptions, table, options } = params;

  const { page, size, sort, ...filters } = dynamicQueryOptions;

  let dynamicQuery = baseQuery;

  // apply filters

  const conditions: SQL[] = [];

  const tableRecord = table as Record<string, unknown>;

  for (const [key, value] of Object.entries(filters)) {
    const column = tableRecord[key];
    if (!column || value === undefined) {
      continue;
    }

    const pgColumn = column as PgColumn;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const filterObj = value as Record<string, unknown>;

      if ("eq" in filterObj && filterObj.eq !== undefined) {
        conditions.push(eq(pgColumn, filterObj.eq));
      }
      if ("ne" in filterObj && filterObj.ne !== undefined)
        conditions.push(ne(pgColumn, filterObj.ne));
      if ("gt" in filterObj && filterObj.gt !== undefined)
        conditions.push(gt(pgColumn, filterObj.gt));
      if ("gte" in filterObj && filterObj.gte !== undefined)
        conditions.push(gte(pgColumn, filterObj.gte));
      if ("lt" in filterObj && filterObj.lt !== undefined)
        conditions.push(lt(pgColumn, filterObj.lt));
      if ("lte" in filterObj && filterObj.lte !== undefined)
        conditions.push(lte(pgColumn, filterObj.lte));
      if ("like" in filterObj && filterObj.like !== undefined) {
        const val = String(filterObj.like);
        const searchStr = val.includes("%") ? val : `%${val}%`;
        conditions.push(like(pgColumn, searchStr));
      }
      if ("ilike" in filterObj && filterObj.ilike !== undefined) {
        const val = String(filterObj.ilike);
        const searchStr = val.includes("%") ? val : `%${val}%`;
        conditions.push(ilike(pgColumn, searchStr));
      }
      if (
        "in" in filterObj &&
        filterObj.in !== undefined &&
        Array.isArray(filterObj.in)
      )
        conditions.push(inArray(pgColumn, filterObj.in as unknown[]));
      if (
        "nin" in filterObj &&
        filterObj.nin !== undefined &&
        Array.isArray(filterObj.nin)
      )
        conditions.push(notInArray(pgColumn, filterObj.nin as unknown[]));
    } else {
      conditions.push(eq(pgColumn, value));
    }
  }

  if (conditions.length) {
    dynamicQuery = dynamicQuery.where(and(...conditions)) as T;
  }

  if (options?.isCount) {
    return dynamicQuery;
  }

  if (sort.length > 0) {
    const orderBys = sort
      .map((sortField) => {
        const isDesc = sortField.startsWith("-");
        const fieldName = isDesc ? sortField.substring(1) : sortField;
        const column = tableRecord[fieldName];

        if (!column) {
          return undefined;
        }

        const pgColumn = column as PgColumn;
        return isDesc ? desc(pgColumn) : asc(pgColumn);
      })
      .filter((orderBy): orderBy is SQL => orderBy !== undefined);

    if (orderBys.length > 0) {
      dynamicQuery = dynamicQuery.orderBy(...orderBys) as T;
    }
  }

  dynamicQuery = dynamicQuery.limit(size).offset((page - 1) * size) as T;

  return dynamicQuery;
}

export function buildPagination(params: {
  page: number;
  size: number;
  totalItems: number;
}) {
  const { page, size, totalItems } = params;
  const totalPages = Math.ceil(totalItems / size);

  return {
    currentPage: page,
    itemsPerPage: size,
    totalItems,
    totalPages,
    hasMore: page < totalPages,
  };
}
