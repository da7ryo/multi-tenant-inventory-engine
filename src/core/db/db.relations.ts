import { relations } from "drizzle-orm";
import {
  usersTable,
  rolesTable,
  permissionsTable,
  rolesToPermissions,
} from "./db.tables";

// 1. User belongs to a Role
export const usersRelations = relations(usersTable, ({ one }) => ({
  role: one(rolesTable, {
    fields: [usersTable.roleId],
    references: [rolesTable.id],
  }),
}));

// 2. Role has many Users, and many Permissions (via junction table)
export const rolesRelations = relations(rolesTable, ({ many }) => ({
  users: many(usersTable),
  permissions: many(rolesToPermissions),
}));

// 3. Permission has many Roles (via junction table)
export const permissionsRelations = relations(permissionsTable, ({ many }) => ({
  roles: many(rolesToPermissions),
}));

// 4. Junction table relations (links roles to permissions)
export const rolesToPermissionsRelations = relations(
  rolesToPermissions,
  ({ one }) => ({
    role: one(rolesTable, {
      fields: [rolesToPermissions.roleId],
      references: [rolesTable.id],
    }),
    permission: one(permissionsTable, {
      fields: [rolesToPermissions.permissionId],
      references: [permissionsTable.id],
    }),
  }),
);
