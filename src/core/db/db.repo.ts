// **** USERS ****

import { eq, count } from "drizzle-orm";
import { tenantsTable, usersTable } from "./db.tables";
import {
  FindTenantsParams,
  FindUserByEmailParams,
  InsertTenantParams,
  TenantDb,
} from "./db.types";
import { applyDynamicQuery, buildPagination } from "./db.utils";

export async function findUserByEmail(params: FindUserByEmailParams) {
  const { dbClient, options } = params;
  const { email } = options;

  const retrievedUser = await dbClient.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
    with: {
      role: {
        columns: {
          id: true,
          name: true,
          tenantId: true,
          createdAt: true,
          updatedAt: true,
        },
        with: {
          permissions: {
            with: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!retrievedUser) {
    return null;
  }

  return {
    ...retrievedUser,
    role: {
      ...retrievedUser.role,
      permissions: retrievedUser.role.permissions.map(
        (permission) => permission.permission,
      ),
    },
  };
}

// tenants

export async function findTenants(params: FindTenantsParams) {
  const { dbClient, options } = params;

  const dataQuery = dbClient.select().from(tenantsTable).$dynamic();

  const dynamicDataQuery = applyDynamicQuery({
    baseQuery: dataQuery,
    dynamicQueryOptions: options,
    table: tenantsTable,
  });

  const countQuery = dbClient
    .select({ count: count() })
    .from(tenantsTable)
    .$dynamic();

  const dynamicCountQuery = applyDynamicQuery({
    baseQuery: countQuery,
    dynamicQueryOptions: options,
    table: tenantsTable,
    options: { isCount: true },
  });

  const [tenants, tenantsCount] = await Promise.all([
    dynamicDataQuery,
    dynamicCountQuery,
  ]);

  return {
    tenants,
    pagination: buildPagination({
      page: options.page,
      size: options.size,
      totalItems: tenantsCount[0].count,
    }),
  };
}

export async function insertTenant(params: InsertTenantParams) {
  const { dbClient, tenantInsertData } = params;

  const createdTenant = await dbClient
    .insert(tenantsTable)
    .values(tenantInsertData)
    .returning();

  return createdTenant[0] as TenantDb;
}
