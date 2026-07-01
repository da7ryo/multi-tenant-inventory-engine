import {
  integer,
  pgTable,
  varchar,
  uuid,
  boolean,
  timestamp,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
};

export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  isPlatformOperator: boolean("is_platform_operator").default(false).notNull(),
  ...timestamps,
});

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  tenantId: uuid("tenant_id")
    .references(() => tenants.id, {
      onDelete: "cascade",
    })
    .notNull(),
  ...timestamps,
});

export enum PermissionEnum {
  TenantsRead = "tenants:read",
  TenantsReadSelf = "tenants:read_self",
  TenantsCreate = "tenants:create",
  TenantsUpdate = "tenants:update",
  TenantsUpdateSelf = "tenants:update_self",
  TenantsDelete = "tenants:delete",
  RolesRead = "roles:read",
  RolesReadSelf = "roles:read_self",
  RolesCreate = "roles:create",
  RolesCreateSelf = "roles:create_self",
  RolesUpdate = "roles:update",
  RolesUpdateSelf = "roles:update_self",
  RolesDelete = "roles:delete",
  RolesDeleteSelf = "roles:delete_self",
}

export const dbPermissionEnum = pgEnum("user_permission", [
  PermissionEnum.TenantsRead,
  PermissionEnum.TenantsReadSelf,
  PermissionEnum.TenantsCreate,
  PermissionEnum.TenantsUpdate,
  PermissionEnum.TenantsUpdateSelf,
  PermissionEnum.TenantsDelete,
  PermissionEnum.RolesRead,
  PermissionEnum.RolesReadSelf,
  PermissionEnum.RolesCreate,
  PermissionEnum.RolesCreateSelf,
  PermissionEnum.RolesUpdate,
  PermissionEnum.RolesUpdateSelf,
  PermissionEnum.RolesDelete,
  PermissionEnum.RolesDeleteSelf,
]);

export const permissions = pgTable("permissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  action: dbPermissionEnum("action").unique().notNull(),
  description: varchar("description", { length: 255 }),
});

export const rolesToPermissions = pgTable(
  "roles_to_permissions",
  {
    roleId: uuid("role_id")
      .references(() => roles.id, { onDelete: "cascade" })
      .notNull(),
    permissionId: uuid("permission_id")
      .references(() => permissions.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })],
);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password").notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  tenantId: uuid("tenant_id")
    .references(() => tenants.id, { onDelete: "cascade" })
    .notNull(),
  roleId: uuid("role_id").references(() => roles.id, { onDelete: "set null" }),

  ...timestamps,
});
