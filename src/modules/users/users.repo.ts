import {
  db,
  permissions,
  roles,
  rolesToPermissions,
  users,
} from "../../core/db";
import { eq } from "drizzle-orm";

export async function findUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user || null;
}

export async function findUserPermisions(userId: string) {
  const userPermissions = await db
    .select({ action: permissions.action })
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id))
    .leftJoin(rolesToPermissions, eq(roles.id, rolesToPermissions.roleId))
    .leftJoin(permissions, eq(rolesToPermissions.permissionId, permissions.id))
    .where(eq(users.id, userId));

  return userPermissions;
}
