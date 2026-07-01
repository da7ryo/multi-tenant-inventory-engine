import "dotenv/config";
import { db } from "../core/db";
import {
  tenants,
  roles,
  permissions,
  users,
  PermissionEnum,
  rolesToPermissions,
} from "../core/db/schema";

async function createPlatformTenantWithUser() {
  try {
    const [platformTenant] = await db
      .insert(tenants)
      .values({
        name: "Dario inventory",
        isPlatformOperator: true,
      })
      .returning();

    const [systemAdminRole] = await db
      .insert(roles)
      .values({
        name: "SystemAdmin",
        tenantId: platformTenant.id,
      })
      .returning();

    const createdPermissions = await db
      .insert(permissions)
      .values([
        {
          action: PermissionEnum.TenantsRead,
          description: "Read all tenants",
        },
        {
          action: PermissionEnum.TenantsReadSelf,
          description: "Read own tenant",
        },
        {
          action: PermissionEnum.TenantsCreate,
          description: "Create tenant",
        },
        {
          action: PermissionEnum.TenantsUpdate,
          description: "Update any tenant",
        },
        {
          action: PermissionEnum.TenantsUpdateSelf,
          description: "Update own tenant",
        },
        {
          action: PermissionEnum.TenantsDelete,
          description: "Delete tenant",
        },
        { action: PermissionEnum.RolesRead, description: "Read all roles" },
        { action: PermissionEnum.RolesReadSelf, description: "Read own role" },
        { action: PermissionEnum.RolesCreate, description: "Create role" },
        {
          action: PermissionEnum.RolesCreateSelf,
          description: "Create own role",
        },
        { action: PermissionEnum.RolesUpdate, description: "Update role" },
        {
          action: PermissionEnum.RolesUpdateSelf,
          description: "Update own role",
        },
        { action: PermissionEnum.RolesDelete, description: "Delete role" },
        {
          action: PermissionEnum.RolesDeleteSelf,
          description: "Delete own role",
        },
      ])
      .returning();

    const createdRolesToPermissions = await db
      .insert(rolesToPermissions)
      .values(
        createdPermissions.map((createdPermission) => ({
          roleId: systemAdminRole.id,
          permissionId: createdPermission.id,
        })),
      )
      .returning();

    const systemAdminUser = await db.insert(users).values({
      email: "da7ryo@gmail.com",
      password: "12345678",
      firstName: "Dario",
      lastName: "Milanovic",
      tenantId: platformTenant.id,
      roleId: systemAdminRole.id,
    });

    console.log("****************** PLATFORM TENANT ******************");
    console.log(platformTenant);
    console.log("****************** SYSTEM ADMIN ROLE ******************");
    console.log(systemAdminRole);
    console.log("****************** CREATED PERMISSIONS ******************");
    console.log(createdPermissions);
    console.log(
      "****************** CREATED ROLES TO PERMISSIONS ******************",
    );
    console.log(createdRolesToPermissions);
  } catch (error) {
    console.log(error);
  }
}

createPlatformTenantWithUser();
