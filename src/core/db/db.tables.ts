import {
  pgTable,
  varchar,
  uuid,
  boolean,
  timestamp,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";
import { PERMISSION_ACTION } from "./db.constants";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
};

export const tenantsTable = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),

  ...timestamps,
});

export const permissionActionEnum = pgEnum("permission_action", [
  PERMISSION_ACTION.TenantsReadGlobal,
  PERMISSION_ACTION.TenantsCreateGlobal,
  PERMISSION_ACTION.TenantsUpdateGlobal,
  PERMISSION_ACTION.TenantsDeleteGlobal,
  PERMISSION_ACTION.TenantsReadTenant,
]);

export const permissionsTable = pgTable("permissions", {
  id: uuid().primaryKey().defaultRandom(),
  action: permissionActionEnum("action").unique().notNull(),
  description: varchar({ length: 255 }),

  ...timestamps,
});

export const rolesTable = pgTable("roles", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),

  tenantId: uuid().references(() => tenantsTable.id, {
    onDelete: "cascade",
  }),

  ...timestamps,
});

export const rolesToPermissions = pgTable(
  "roles_to_permissions",
  {
    roleId: uuid("role_id")
      .references(() => rolesTable.id, { onDelete: "cascade" })
      .notNull(),
    permissionId: uuid("permission_id")
      .references(() => permissionsTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })],
);

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  isActive: boolean().notNull().default(false),

  roleId: uuid()
    .references(() => rolesTable.id, { onDelete: "cascade" })
    .notNull(),

  tenantId: uuid().references(() => tenantsTable.id, {
    onDelete: "cascade",
  }),

  ...timestamps,
});
