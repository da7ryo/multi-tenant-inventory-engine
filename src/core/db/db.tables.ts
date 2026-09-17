import {
  pgTable,
  varchar,
  uuid,
  boolean,
  timestamp,
  pgEnum,
  primaryKey,
  unique,
  text,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import {
  INVENTORY_MOVEMENT_TYPE,
  PERMISSION_ACTION,
  PURCHASE_ORDER_STATUS,
} from "./db.constants";

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

export const categoriesTable = pgTable(
  "categories",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),

    tenantId: uuid()
      .references(() => tenantsTable.id, { onDelete: "cascade" })
      .notNull(),

    ...timestamps,
  },
  (table) => [unique().on(table.tenantId, table.name)],
);

export const productsTable = pgTable(
  "products",
  {
    id: uuid().primaryKey().defaultRandom(),
    sku: varchar({ length: 100 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    unitOfMeasure: varchar({ length: 50 }).notNull().default("ea"),
    isActive: boolean().notNull().default(true),
    reorderPoint: integer().notNull().default(0),

    tenantId: uuid()
      .references(() => tenantsTable.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: uuid().references(() => categoriesTable.id, {
      onDelete: "set null",
    }),

    ...timestamps,
  },
  (table) => [unique().on(table.tenantId, table.sku)],
);

export const warehousesTable = pgTable(
  "warehouses",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    address: varchar({ length: 500 }),
    isActive: boolean().notNull().default(true),

    tenantId: uuid()
      .references(() => tenantsTable.id, { onDelete: "cascade" })
      .notNull(),

    ...timestamps,
  },
  (table) => [unique().on(table.tenantId, table.name)],
);

export const suppliersTable = pgTable(
  "suppliers",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }),
    phone: varchar({ length: 50 }),
    address: varchar({ length: 500 }),
    isActive: boolean().notNull().default(true),

    tenantId: uuid()
      .references(() => tenantsTable.id, { onDelete: "cascade" })
      .notNull(),

    ...timestamps,
  },
  (table) => [unique().on(table.tenantId, table.name)],
);

export const inventoryLevelsTable = pgTable(
  "inventory_levels",
  {
    id: uuid().primaryKey().defaultRandom(),
    quantityOnHand: integer().notNull().default(0),
    quantityReserved: integer().notNull().default(0),

    tenantId: uuid()
      .references(() => tenantsTable.id, { onDelete: "cascade" })
      .notNull(),
    productId: uuid()
      .references(() => productsTable.id, { onDelete: "cascade" })
      .notNull(),
    warehouseId: uuid()
      .references(() => warehousesTable.id, { onDelete: "cascade" })
      .notNull(),

    ...timestamps,
  },
  (table) => [unique().on(table.productId, table.warehouseId)],
);

export const inventoryMovementTypeEnum = pgEnum("inventory_movement_type", [
  INVENTORY_MOVEMENT_TYPE.Receipt,
  INVENTORY_MOVEMENT_TYPE.Issue,
  INVENTORY_MOVEMENT_TYPE.Adjustment,
  INVENTORY_MOVEMENT_TYPE.TransferIn,
  INVENTORY_MOVEMENT_TYPE.TransferOut,
]);

export const inventoryMovementsTable = pgTable("inventory_movements", {
  id: uuid().primaryKey().defaultRandom(),
  type: inventoryMovementTypeEnum("type").notNull(),
  quantity: integer().notNull(),
  quantityAfter: integer().notNull(),
  note: varchar({ length: 500 }),
  referenceType: varchar({ length: 100 }),
  referenceId: uuid(),

  tenantId: uuid()
    .references(() => tenantsTable.id, { onDelete: "cascade" })
    .notNull(),
  productId: uuid()
    .references(() => productsTable.id, { onDelete: "cascade" })
    .notNull(),
  warehouseId: uuid()
    .references(() => warehousesTable.id, { onDelete: "cascade" })
    .notNull(),
  createdByUserId: uuid().references(() => usersTable.id, {
    onDelete: "set null",
  }),

  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const purchaseOrderStatusEnum = pgEnum("purchase_order_status", [
  PURCHASE_ORDER_STATUS.Draft,
  PURCHASE_ORDER_STATUS.Ordered,
  PURCHASE_ORDER_STATUS.Partial,
  PURCHASE_ORDER_STATUS.Received,
  PURCHASE_ORDER_STATUS.Cancelled,
]);

export const purchaseOrdersTable = pgTable(
  "purchase_orders",
  {
    id: uuid().primaryKey().defaultRandom(),
    orderNumber: varchar({ length: 100 }).notNull(),
    status: purchaseOrderStatusEnum("status")
      .notNull()
      .default(PURCHASE_ORDER_STATUS.Draft),
    orderedAt: timestamp("ordered_at", { withTimezone: true, mode: "string" }),
    expectedAt: timestamp("expected_at", {
      withTimezone: true,
      mode: "string",
    }),
    receivedAt: timestamp("received_at", {
      withTimezone: true,
      mode: "string",
    }),
    notes: varchar({ length: 500 }),

    tenantId: uuid()
      .references(() => tenantsTable.id, { onDelete: "cascade" })
      .notNull(),
    supplierId: uuid()
      .references(() => suppliersTable.id, { onDelete: "restrict" })
      .notNull(),
    warehouseId: uuid()
      .references(() => warehousesTable.id, { onDelete: "restrict" })
      .notNull(),
    createdByUserId: uuid().references(() => usersTable.id, {
      onDelete: "set null",
    }),

    ...timestamps,
  },
  (table) => [unique().on(table.tenantId, table.orderNumber)],
);

export const purchaseOrderItemsTable = pgTable(
  "purchase_order_items",
  {
    id: uuid().primaryKey().defaultRandom(),
    quantityOrdered: integer().notNull(),
    quantityReceived: integer().notNull().default(0),
    unitCost: numeric({ precision: 12, scale: 2 }).notNull().default("0"),

    tenantId: uuid()
      .references(() => tenantsTable.id, { onDelete: "cascade" })
      .notNull(),
    purchaseOrderId: uuid()
      .references(() => purchaseOrdersTable.id, { onDelete: "cascade" })
      .notNull(),
    productId: uuid()
      .references(() => productsTable.id, { onDelete: "restrict" })
      .notNull(),

    ...timestamps,
  },
  (table) => [unique().on(table.purchaseOrderId, table.productId)],
);
