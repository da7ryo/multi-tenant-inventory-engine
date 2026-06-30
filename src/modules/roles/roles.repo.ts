import { db, RoleCreateDb, roles, roles as rolesTable } from "../../core/db";
import { eq } from "drizzle-orm";

export async function findRoles() {
  const roles = await db.select().from(rolesTable);
  return roles;
}

export async function createRole(role: RoleCreateDb) {
  const [createdRole] = await db.insert(rolesTable).values(role).returning();
  return createdRole;
}

export async function findRoleById(id: string) {
  const [role] = await db
    .select()
    .from(rolesTable)
    .where(eq(rolesTable.id, id));

  return role || null;
}
