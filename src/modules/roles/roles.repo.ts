import { db, roles as rolesTable, rolesToPermissions } from "../../core/db";
import { eq } from "drizzle-orm";
import { RoleCreateReqBody } from "./roles.types";

export async function findRoles() {
  const roles = await db.select().from(rolesTable);
  return roles;
}

export async function createRoleWithPermissions(role: RoleCreateReqBody) {
  return await db.transaction(async (tx) => {
    const { permissions, ...roleData } = role;

    const [createdRole] = await tx
      .insert(rolesTable)
      .values(roleData)
      .returning();

    if (permissions?.length) {
      await tx.insert(rolesToPermissions).values(
        permissions.map((permissionId) => ({
          roleId: createdRole.id,
          permissionId,
        })),
      );
    }

    return {
      ...createdRole,
      permissions,
    };
  });
}

export async function findRoleById(id: string) {
  const [role] = await db
    .select()
    .from(rolesTable)
    .where(eq(rolesTable.id, id));

  return role || null;
}
