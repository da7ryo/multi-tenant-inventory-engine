// **** USERS ****

import { eq, count, and, inArray } from "drizzle-orm";
import {
  categoriesTable,
  productsTable,
  suppliersTable,
  tenantsTable,
  usersTable,
  warehousesTable,
  rolesTable,
  permissionsTable,
  rolesToPermissions,
} from "./db.tables";
import {
  CategoryDb,
  DeleteCategoryParams,
  DeleteProductParams,
  DeleteSupplierParams,
  DeleteWarehouseParams,
  FindCategoryByIdParams,
  FindCategoryParams,
  FindPermissionsByActionsParams,
  FindProductByIdParams,
  FindProductParams,
  FindSupplierByIdParams,
  FindSupplierParams,
  FindTenantsParams,
  FindUserByEmailParams,
  FindWarehouseByIdParams,
  FindWarehouseParams,
  InsertCategoryParams,
  InsertPermissionsParams,
  InsertProductParams,
  InsertRoleParams,
  InsertRoleToPermissionsParams,
  InsertSupplierParams,
  InsertTenantParams,
  InsertUserParams,
  InsertWarehouseParams,
  PermissionDb,
  ProductDb,
  RoleDb,
  SupplierCreateDb,
  SupplierDb,
  TenantDb,
  UpdateCategoryParams,
  UpdateProductParams,
  UpdateSupplierDb,
  UpdateSupplierParams,
  UpdateWarehouseDb,
  UpdateWarehouseParams,
  UserDb,
  WarehouseDb,
} from "./db.types";
import { applyDynamicQuery, buildPagination } from "./db.utils";

// USERS

export async function findUserByEmail(params: FindUserByEmailParams) {
  const { dbClient, options } = params;
  const { email } = options;

  const retrievedUser = await dbClient.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
    with: {
      role: {
        columns: {
          id: true,
          name: true,
          tenantId: true,
          createdAt: true,
          updatedAt: true,
        },
        with: {
          permissions: {
            with: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!retrievedUser) {
    return null;
  }

  return {
    ...retrievedUser,
    role: {
      ...retrievedUser.role,
      permissions: retrievedUser.role.permissions.map(
        (permission) => permission.permission,
      ),
    },
  };
}

// ROLES

export async function insertRole(params: InsertRoleParams) {
  const { dbClient, roleInsertData } = params;

  const createdRole = await dbClient
    .insert(rolesTable)
    .values(roleInsertData)
    .returning();

  return createdRole[0] as RoleDb;
}

// PERMISSIONS

export async function insertPermissions(params: InsertPermissionsParams) {
  const { dbClient, permissionsInsertData } = params;

  const createdPermissions = await dbClient
    .insert(permissionsTable)
    .values(permissionsInsertData)
    .onConflictDoNothing({ target: permissionsTable.action })
    .returning();

  return createdPermissions as PermissionDb[];
}

export async function findPermissionsByActions(
  params: FindPermissionsByActionsParams,
) {
  const { dbClient, options } = params;

  const permissions = await dbClient
    .select()
    .from(permissionsTable)
    .where(inArray(permissionsTable.action, options.actions));

  return permissions as PermissionDb[];
}

// ROLES TO PERMISSIONS

export async function insertRoleToPermissions(
  params: InsertRoleToPermissionsParams,
) {
  const { dbClient, roleToPermissionsInsertData } = params;

  return await dbClient
    .insert(rolesToPermissions)
    .values(roleToPermissionsInsertData);
}

// USERS

export async function insertUser(params: InsertUserParams) {
  const { dbClient, userInsertData } = params;

  const createdUser = await dbClient
    .insert(usersTable)
    .values(userInsertData)
    .returning();

  return createdUser[0] as UserDb;
}

// TENANTS

export async function findTenants(params: FindTenantsParams) {
  const { dbClient, options } = params;

  const dataQuery = dbClient.select().from(tenantsTable).$dynamic();

  const dynamicDataQuery = applyDynamicQuery({
    baseQuery: dataQuery,
    dynamicQueryOptions: options,
    table: tenantsTable,
  });

  const countQuery = dbClient
    .select({ count: count() })
    .from(tenantsTable)
    .$dynamic();

  const dynamicCountQuery = applyDynamicQuery({
    baseQuery: countQuery,
    dynamicQueryOptions: options,
    table: tenantsTable,
    options: { isCount: true },
  });

  const [tenants, tenantsCount] = await Promise.all([
    dynamicDataQuery,
    dynamicCountQuery,
  ]);

  return {
    tenants,
    pagination: buildPagination({
      page: options.page,
      size: options.size,
      totalItems: tenantsCount[0].count,
    }),
  };
}

export async function insertTenant(params: InsertTenantParams) {
  const { dbClient, tenantInsertData } = params;

  const createdTenant = await dbClient
    .insert(tenantsTable)
    .values(tenantInsertData)
    .returning();

  return createdTenant[0] as TenantDb;
}

// CATEGORIES

// find

export async function findCategories(params: FindCategoryParams) {
  const { dbClient, options } = params;

  const dataQuery = dbClient.select().from(categoriesTable).$dynamic();

  const dynamicDataQuery = applyDynamicQuery({
    baseQuery: dataQuery,
    dynamicQueryOptions: options,
    table: categoriesTable,
  });

  const countQuery = dbClient
    .select({ count: count() })
    .from(categoriesTable)
    .$dynamic();

  const dynamicCountQuery = applyDynamicQuery({
    baseQuery: countQuery,
    dynamicQueryOptions: options,
    table: categoriesTable,
    options: { isCount: true },
  });

  const [categories, categoriesCount] = await Promise.all([
    dynamicDataQuery,
    dynamicCountQuery,
  ]);

  return {
    categories,
    pagination: buildPagination({
      page: options.page,
      size: options.size,
      totalItems: categoriesCount[0].count,
    }),
  };
}

export async function findCategoryById(params: FindCategoryByIdParams) {
  const { dbClient, options } = params;

  const category = await dbClient
    .select()
    .from(categoriesTable)
    .where(
      and(
        eq(categoriesTable.id, options.id),
        eq(categoriesTable.tenantId, options.tenantId),
      ),
    );

  return category[0];
}

// create

export async function insertCategory(params: InsertCategoryParams) {
  const { dbClient, categoryInsertData } = params;

  const createdCategory = await dbClient
    .insert(categoriesTable)
    .values(categoryInsertData)
    .returning();

  return createdCategory[0] as CategoryDb;
}

// update

export async function updateCategory(params: UpdateCategoryParams) {
  const { dbClient, options, categoryUpdateData } = params;

  const conditions = [eq(categoriesTable.id, options.id)];

  if (options.tenantId) {
    conditions.push(eq(categoriesTable.tenantId, options.tenantId));
  }

  const updatedCategory = await dbClient
    .update(categoriesTable)
    .set({ ...categoryUpdateData, updatedAt: new Date().toISOString() })
    .where(and(...conditions))
    .returning();

  return (updatedCategory[0] as CategoryDb) || undefined;
}

export async function deleteCategory(params: DeleteCategoryParams) {
  const { dbClient, options } = params;

  const conditions = [eq(categoriesTable.id, options.id)];

  if (options.tenantId) {
    conditions.push(eq(categoriesTable.tenantId, options.tenantId));
  }

  // delete

  const deletedCategory = await dbClient
    .delete(categoriesTable)
    .where(and(...conditions))
    .returning();

  return (deletedCategory[0] as CategoryDb) || undefined;
}

// PRODUCTS

// find
export async function findProduct(params: FindProductParams) {
  const { dbClient, options } = params;

  const dataQuery = dbClient.select().from(productsTable).$dynamic();

  const dynamicDataQuery = applyDynamicQuery({
    baseQuery: dataQuery,
    dynamicQueryOptions: options,
    table: productsTable,
  });

  const countQuery = dbClient
    .select({ count: count() })
    .from(productsTable)
    .$dynamic();

  const dynamicCountQuery = applyDynamicQuery({
    baseQuery: countQuery,
    dynamicQueryOptions: options,
    table: productsTable,
    options: { isCount: true },
  });

  const [products, productsCount] = await Promise.all([
    dynamicDataQuery,
    dynamicCountQuery,
  ]);

  return {
    products,
    pagination: buildPagination({
      page: options.page,
      size: options.size,
      totalItems: productsCount[0].count,
    }),
  };
}

export async function findProductById(params: FindProductByIdParams) {
  const { dbClient, options } = params;

  const product = await dbClient
    .select()
    .from(productsTable)
    .where(
      and(
        eq(productsTable.id, options.id),
        eq(productsTable.tenantId, options.tenantId),
      ),
    );

  return product[0];
}

// create

export async function createProduct(params: InsertProductParams) {
  const { dbClient, productInsertData } = params;

  const createdProduct = await dbClient
    .insert(productsTable)
    .values(productInsertData)
    .returning();

  return createdProduct[0] as ProductDb;
}

// update

export async function updateProduct(params: UpdateProductParams) {
  const { dbClient, options, updateProductData } = params;

  const conditions = [eq(productsTable.id, options.id)];

  if (options.tenantId) {
    conditions.push(eq(productsTable.tenantId, options.tenantId));
  }

  const updatedProduct = await dbClient
    .update(productsTable)
    .set({ ...updateProductData, updatedAt: new Date().toISOString() })
    .where(and(...conditions))
    .returning();

  return (updatedProduct[0] as ProductDb) || undefined;
}

// delete

export async function deleteProduct(params: DeleteProductParams) {
  const { dbClient, options } = params;

  const conditions = [eq(productsTable.id, options.id)];

  if (options.tenantId) {
    conditions.push(eq(productsTable.tenantId, options.tenantId));
  }

  const deletedProduct = await dbClient
    .delete(productsTable)
    .where(and(...conditions))
    .returning();

  return (deletedProduct[0] as ProductDb) || undefined;
}

//WAREHOUSES

//find

export async function findWarehouses(params: FindWarehouseParams) {
  const { dbClient, options } = params;

  const dataQuery = dbClient.select().from(warehousesTable).$dynamic();

  const dynamicDataQuery = applyDynamicQuery({
    baseQuery: dataQuery,
    dynamicQueryOptions: options,
    table: warehousesTable,
  });

  const countQuery = dbClient
    .select({ count: count() })
    .from(warehousesTable)
    .$dynamic();

  const dynamicCountQuery = applyDynamicQuery({
    baseQuery: countQuery,
    dynamicQueryOptions: options,
    table: warehousesTable,
    options: { isCount: true },
  });

  const [warehouses, warehousesCount] = await Promise.all([
    dynamicDataQuery,
    dynamicCountQuery,
  ]);

  return {
    warehouses,
    pagination: buildPagination({
      page: options.page,
      size: options.size,
      totalItems: warehousesCount[0].count,
    }),
  };
}

export async function findWarehouseById(params: FindWarehouseByIdParams) {
  const { dbClient, options } = params;

  const warehouse = await dbClient
    .select()
    .from(warehousesTable)
    .where(
      and(
        eq(warehousesTable.id, options.id),
        eq(warehousesTable.tenantId, options.tenantId),
      ),
    );

  return warehouse[0];
}

// create

export async function createWarehouse(params: InsertWarehouseParams) {
  const { dbClient, warehouseInsertData } = params;

  const createdWarehouse = await dbClient
    .insert(warehousesTable)
    .values(warehouseInsertData)
    .returning();

  return (createdWarehouse[0] as WarehouseDb) || undefined;
}

// update

export async function updateWarehouse(params: UpdateWarehouseParams) {
  const { dbClient, options, updateWarehouseData } = params;

  const conditions = [eq(warehousesTable.id, options.id)];

  if (options.tenantId) {
    conditions.push(eq(warehousesTable.tenantId, options.tenantId));
  }

  const updatedWarehouse = await dbClient
    .update(warehousesTable)
    .set({ ...updateWarehouseData, updatedAt: new Date().toISOString() })
    .where(and(...conditions))
    .returning();

  return (updatedWarehouse[0] as WarehouseDb) || undefined;
}

// delete

export async function deleteWarehouse(params: DeleteWarehouseParams) {
  const { dbClient, options } = params;

  const conditions = [eq(warehousesTable.id, options.id)];

  if (options.tenantId) {
    conditions.push(eq(warehousesTable.tenantId, options.tenantId));
  }

  const deletedWarehouse = await dbClient
    .delete(warehousesTable)
    .where(and(...conditions))
    .returning();

  return (deletedWarehouse[0] as WarehouseDb) || undefined;
}

// SUPPLIERS

// find

export async function findSupplier(params: FindSupplierParams) {
  const { dbClient, options } = params;

  const dataQuery = dbClient.select().from(suppliersTable).$dynamic();

  const dynamicDataQuery = applyDynamicQuery({
    baseQuery: dataQuery,
    dynamicQueryOptions: options,
    table: suppliersTable,
  });

  const countQuery = dbClient
    .select({ count: count() })
    .from(suppliersTable)
    .$dynamic();

  const dynamicCountQuery = applyDynamicQuery({
    baseQuery: countQuery,
    dynamicQueryOptions: options,
    table: suppliersTable,
    options: { isCount: true },
  });

  const [suppliers, suppliersCount] = await Promise.all([
    dynamicDataQuery,
    dynamicCountQuery,
  ]);

  return {
    suppliers,
    pagination: buildPagination({
      page: options.page,
      size: options.size,
      totalItems: suppliersCount[0].count,
    }),
  };
}

export async function findSupplierById(params: FindSupplierByIdParams) {
  const { dbClient, options } = params;

  const supplier = await dbClient
    .select()
    .from(suppliersTable)
    .where(
      and(
        eq(suppliersTable.id, options.id),
        eq(suppliersTable.tenantId, options.tenantId),
      ),
    );

  return supplier[0];
}

// create

export async function createSupplier(params: InsertSupplierParams) {
  const { dbClient, supplierInsertData } = params;

  const createdSupplier = await dbClient
    .insert(suppliersTable)
    .values(supplierInsertData)
    .returning();

  return createdSupplier[0] as SupplierDb;
}

export async function updateSupplier(params: UpdateSupplierParams) {
  const { dbClient, options, updateSupplierData } = params;

  const conditions = [eq(suppliersTable.id, options.id)];

  if (options.tenantId) {
    conditions.push(eq(suppliersTable.tenantId, options.tenantId));
  }

  const updatedSupplier = await dbClient
    .update(suppliersTable)
    .set({ ...updateSupplierData, updatedAt: new Date().toISOString() })
    .where(and(...conditions))
    .returning();

  return (updatedSupplier[0] as SupplierDb) || undefined;
}

// delete

export async function deleteSupplier(params: DeleteSupplierParams) {
  const { dbClient, options } = params;

  const conditions = [eq(suppliersTable.id, options.id)];

  if (options.tenantId) {
    conditions.push(eq(suppliersTable.tenantId, options.tenantId));
  }

  const deletedSupplier = await dbClient
    .delete(suppliersTable)
    .where(and(...conditions))
    .returning();

  return (deletedSupplier[0] as SupplierDb) || undefined;
}
