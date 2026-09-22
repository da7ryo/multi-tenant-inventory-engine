import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import {
  tenantsTable,
  categoriesTable,
  productsTable,
  warehousesTable,
  suppliersTable,
  rolesTable,
  permissionsTable,
  rolesToPermissions,
  usersTable,
} from "./db.tables";
import { PERMISSION_ACTION, PERMISSION_SCOPE } from "./db.constants";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./db.schema";

export type DbClient = NodePgDatabase<typeof schema>;

type FilterOperators<T> = {
  eq?: T;
  ne?: T;
  gt?: T;
  gte?: T;
  lt?: T;
  lte?: T;
  like?: T;
  ilike?: T;
  in?: T[];
  nin?: T[];
};

// Roles

export type RoleDb = InferSelectModel<typeof rolesTable>;
export type RoleCreateDb = InferInsertModel<typeof rolesTable>;
export type InsertRoleParams = {
  dbClient: DbClient;
  roleInsertData: RoleCreateDb;
};

// Permissions
export type PermissionScope =
  (typeof PERMISSION_SCOPE)[keyof typeof PERMISSION_SCOPE];
export type PermissionAction =
  (typeof PERMISSION_ACTION)[keyof typeof PERMISSION_ACTION];

export type PermissionDb = InferSelectModel<typeof permissionsTable>;
export type PermissionCreateDb = InferInsertModel<typeof permissionsTable>;
export type InsertPermissionsParams = {
  dbClient: DbClient;
  permissionsInsertData: PermissionCreateDb[];
};
export type FindPermissionsByActionsParams = {
  dbClient: DbClient;
  options: {
    actions: PermissionAction[];
  };
};

// Roles to permissions

export type RoleToPermissionCreateDb = InferInsertModel<
  typeof rolesToPermissions
>;
export type InsertRoleToPermissionsParams = {
  dbClient: DbClient;
  roleToPermissionsInsertData: RoleToPermissionCreateDb[];
};

// Users

export type UserDb = InferSelectModel<typeof usersTable>;
export type UserCreateDb = InferInsertModel<typeof usersTable>;
export type InsertUserParams = {
  dbClient: DbClient;
  userInsertData: UserCreateDb;
};

//Tenants

export type TenantDb = InferSelectModel<typeof tenantsTable>;
export type TenantCreateDb = InferInsertModel<typeof tenantsTable>;
export type InsertTenantParams = {
  dbClient: DbClient;
  tenantInsertData: TenantCreateDb;
};
export type FindTenantsOptions = {
  page: number;
  size: number;
  sort: string[];
  name?: string | FilterOperators<string>;
};
export type FindTenantsParams = {
  dbClient: DbClient;
  options: FindTenantsOptions;
};

//Users
export type FindUserByEmailOptions = {
  email: string;
};
export type FindUserByEmailParams = {
  dbClient: DbClient;
  options: FindUserByEmailOptions;
};

// Categories

export type CategoryDb = InferSelectModel<typeof categoriesTable>;
export type CategoryCreateDb = InferInsertModel<typeof categoriesTable>;
export type InsertCategoryParams = {
  dbClient: DbClient;
  categoryInsertData: CategoryCreateDb;
};

export type FindCategoryByIdOptions = {
  id: string;
  tenantId: string;
};

export type FindCategoryByIdParams = {
  dbClient: DbClient;
  options: FindCategoryByIdOptions;
};

export type FindCategoryOptions = {
  page: number;
  size: number;
  sort: string[];
  name?: string | FilterOperators<string>;
  tenantId: string;
};

export type FindCategoryParams = {
  dbClient: DbClient;
  options: FindCategoryOptions;
};

export type CategoryUpdateDb = Partial<CategoryCreateDb>;
export type UpdateCategoryOptions = {
  id: string;
  tenantId: string;
};
export type UpdateCategoryParams = {
  dbClient: DbClient;
  options: UpdateCategoryOptions;
  categoryUpdateData: CategoryUpdateDb;
};

export type DeleteCategoryOptions = {
  id: string;
  tenantId: string;
};

export type DeleteCategoryParams = {
  dbClient: DbClient;
  options: DeleteCategoryOptions;
};

// PRODUCTS

export type ProductDb = InferSelectModel<typeof productsTable>;
export type ProductCreateDb = InferInsertModel<typeof productsTable>;

export type InsertProductParams = {
  dbClient: DbClient;
  productInsertData: ProductCreateDb;
};

export type FindProductByIdOptions = {
  id: string;
  tenantId: string;
};

export type FindProductByIdParams = {
  dbClient: DbClient;
  options: FindProductByIdOptions;
};

export type FindProductOptions = {
  page: number;
  size: number;
  sort: string[];
  name?: string | FilterOperators<string>;
  tenantId: string;
  sku?: string | FilterOperators<string>;
  isActive?: boolean | FilterOperators<boolean>;
  categoryId?: string | FilterOperators<string>;
};

export type FindProductParams = {
  dbClient: DbClient;
  options: FindProductOptions;
};

export type UpdateProductDb = Partial<ProductCreateDb>;
export type UpdateProductOptions = {
  id: string;
  tenantId: string;
};

export type UpdateProductParams = {
  dbClient: DbClient;
  options: UpdateProductOptions;
  updateProductData: UpdateProductDb;
};

export type DeleteProductOptions = {
  id: string;
  tenantId: string;
};

export type DeleteProductParams = {
  dbClient: DbClient;
  options: DeleteProductOptions;
};

//WAREHOUSES

export type WarehouseDb = InferSelectModel<typeof warehousesTable>;
export type WarehouseCreateDb = InferInsertModel<typeof warehousesTable>;

export type InsertWarehouseParams = {
  dbClient: DbClient;
  warehouseInsertData: WarehouseCreateDb;
};

export type FindWarehouseByIdOptions = {
  id: string;
  tenantId: string;
};

export type FindWarehouseByIdParams = {
  dbClient: DbClient;
  options: FindWarehouseByIdOptions;
};

export type FindWarehouseOptions = {
  page: number;
  size: number;
  sort: string[];
  name?: string | FilterOperators<string>;
  id?: string | FilterOperators<string>;
  tenantId: string;
  isActive?: boolean | FilterOperators<boolean>;
  address?: string | FilterOperators<string>;
};

export type FindWarehouseParams = {
  dbClient: DbClient;
  options: FindWarehouseOptions;
};

export type UpdateWarehouseDb = Partial<WarehouseCreateDb>;
export type UpdateWarehouseOptions = {
  id: string;
  tenantId: string;
};

export type UpdateWarehouseParams = {
  dbClient: DbClient;
  options: UpdateWarehouseOptions;
  updateWarehouseData: UpdateWarehouseDb;
};

export type DeleteWarehouseOptions = {
  id: string;
  tenantId: string;
};

export type DeleteWarehouseParams = {
  dbClient: DbClient;
  options: DeleteWarehouseOptions;
};

// SUPPLIERS

export type SupplierDb = InferSelectModel<typeof suppliersTable>;
export type SupplierCreateDb = InferInsertModel<typeof suppliersTable>;

export type InsertSupplierParams = {
  dbClient: DbClient;
  supplierInsertData: SupplierCreateDb;
};

export type FindSupplierByIdOptions = {
  id: string;
  tenantId: string;
};

export type FindSupplierByIdParams = {
  dbClient: DbClient;
  options: FindSupplierByIdOptions;
};

export type FindSupplierOptions = {
  page: number;
  size: number;
  sort: string[];
  name?: string | FilterOperators<string>;
  tenantId: string;
  id?: string | FilterOperators<string>;
  address?: string | FilterOperators<string>;
  email?: string | FilterOperators<string>;
  phone?: string | FilterOperators<string>;
  isActive?: boolean | FilterOperators<boolean>;
};

export type FindSupplierParams = {
  dbClient: DbClient;
  options: FindSupplierOptions;
};

export type UpdateSupplierDb = Partial<SupplierCreateDb>;

export type UpdateSupplierOptions = {
  id: string;
  tenantId: string;
};

export type UpdateSupplierParams = {
  dbClient: DbClient;
  options: UpdateSupplierOptions;
  updateSupplierData: UpdateSupplierDb;
};

export type DeleteSupplierOptions = {
  id: string;
  tenantId: string;
};

export type DeleteSupplierParams = {
  dbClient: DbClient;
  options: DeleteSupplierOptions;
};
