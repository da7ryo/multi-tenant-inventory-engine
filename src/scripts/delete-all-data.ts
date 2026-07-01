import "dotenv/config";
import { db } from "../core/db";
import {
  tenants,
  roles,
  permissions,
  users,
  rolesToPermissions,
} from "../core/db/schema";

async function deleteAllData() {
  await db.delete(tenants);
  await db.delete(roles);
  await db.delete(permissions);
  await db.delete(users);
  await db.delete(rolesToPermissions);
}

/* async function deleteAllData() {
  await Promise.all([
    db.delete(tenants),
    db.delete(roles),
    db.delete(permissions),
    db.delete(users),
    db.delete(rolesToPermissions),
  ]);
} */

deleteAllData();
