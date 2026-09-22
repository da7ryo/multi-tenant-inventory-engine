import "dotenv/config";
import { createDbClient } from "./db.client";
import { hash } from "bcryptjs";
import { PERMISSION_ACTION, PERMISSION_ACTIONS } from "./db.constants";
import {
  findPermissionsByActions,
  insertPermissions,
  insertRole,
  insertRoleToPermissions,
  insertTenant,
  insertUser,
} from "./db.repo";
import { CONFIG } from "../config";

const { dbClient, closeDbClient } = createDbClient({
  databaseUrl: CONFIG.DB_URL,
});

const seedUserEmail =
  process.env.SEED_USER_EMAIL ?? "inventory.manager@example.com";
const seedUserPassword = process.env.SEED_USER_PASSWORD;
const seedTenantName = process.env.SEED_TENANT_NAME ?? "Inventory Manager";

const inventoryManagerPermissions = [
  PERMISSION_ACTION.CategoriesReadTenant,
  PERMISSION_ACTION.CategoriesCreateTenant,
  PERMISSION_ACTION.CategoriesUpdateTenant,
  PERMISSION_ACTION.CategoriesDeleteTenant,
  PERMISSION_ACTION.ProductsReadTenant,
  PERMISSION_ACTION.ProductsCreateTenant,
  PERMISSION_ACTION.ProductsUpdateTenant,
  PERMISSION_ACTION.ProductsDeleteTenant,
  PERMISSION_ACTION.WarehousesReadTenant,
  PERMISSION_ACTION.WarehousesCreateTenant,
  PERMISSION_ACTION.WarehousesUpdateTenant,
  PERMISSION_ACTION.WarehousesDeleteTenant,
  PERMISSION_ACTION.SuppliersReadTenant,
  PERMISSION_ACTION.SuppliersCreateTenant,
  PERMISSION_ACTION.SuppliersUpdateTenant,
  PERMISSION_ACTION.SuppliersDeleteTenant,
];

async function seed() {
  await insertPermissions({
    dbClient,
    permissionsInsertData: PERMISSION_ACTIONS.map((action) => ({ action })),
  });

  const permissions = await findPermissionsByActions({
    dbClient,
    options: { actions: inventoryManagerPermissions },
  });

  if (permissions.length !== inventoryManagerPermissions.length) {
    throw new Error("Not all inventory manager permissions were found.");
  }

  /*const role = await insertRole({
    dbClient,
    roleInsertData: {
      name: "InventoryManager",
      description: "Manages inventory resources for one tenant.",
      tenantId: "c0b01980-b99a-4b8d-9597-1b9572bb2b0d",
    },
  });

  await insertRoleToPermissions({
    dbClient,
    roleToPermissionsInsertData: permissions.map((permission) => ({
      roleId: role.id,
      permissionId: permission.id,
    })),
  });

  if (!seedUserPassword) {
    throw new Error(
      "SEED_USER_PASSWORD environment variable is required to run the seed.",
    );
  }

  const password = await hash(seedUserPassword, 12);

  const user = await insertUser({
    dbClient,
    userInsertData: {
      email: seedUserEmail,
      password,
      isActive: true,
      roleId: role.id,
      tenantId: "c0b01980-b99a-4b8d-9597-1b9572bb2b0d",
    },
  }); */

  console.log("Seed completed successfully.");
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDbClient();
  });
