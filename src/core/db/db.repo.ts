// **** USERS ****

import { eq } from "drizzle-orm";
import { tenantsTable, usersTable } from "./db.tables";
import {
  FindUserByEmailParams,
  InsertTenantParams,
  TenantDb,
} from "./db.types";

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

export async function insertTenant(params: InsertTenantParams) {
  const { dbClient, tenantInsertData } = params;

  const createdTenant = await dbClient
    .insert(tenantsTable)
    .values(tenantInsertData)
    .returning();

  return createdTenant[0] as TenantDb;
}
