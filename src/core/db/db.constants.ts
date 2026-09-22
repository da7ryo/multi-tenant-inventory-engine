export const PERMISSION_SCOPE = {
  Global: "global",
  Tenant: "tenant",
} as const;

export const PERMISSION_ACTION = {
  // Tenants
  TenantsReadGlobal: `tenants:read:${PERMISSION_SCOPE.Global}`,
  TenantsCreateGlobal: `tenants:create:${PERMISSION_SCOPE.Global}`,
  TenantsUpdateGlobal: `tenants:update:${PERMISSION_SCOPE.Global}`,
  TenantsDeleteGlobal: `tenants:delete:${PERMISSION_SCOPE.Global}`,
  TenantsReadTenant: `tenants:read:${PERMISSION_SCOPE.Tenant}`,

  // Categories

  CategoriesReadGlobal: `categories:read:${PERMISSION_SCOPE.Global}`,
  CategoriesCreateGlobal: `categories:create:${PERMISSION_SCOPE.Global}`,
  CategoriesUpdateGlobal: `categories:update:${PERMISSION_SCOPE.Global}`,
  CategoriesDeleteGlobal: `categories:delete:${PERMISSION_SCOPE.Global}`,
  CategoriesReadTenant: `categories:read:${PERMISSION_SCOPE.Tenant}`,
  CategoriesCreateTenant: `categories:create:${PERMISSION_SCOPE.Tenant}`,
  CategoriesUpdateTenant: `categories:update:${PERMISSION_SCOPE.Tenant}`,
  CategoriesDeleteTenant: `categories:delete:${PERMISSION_SCOPE.Tenant}`,

  // Products
  ProductsReadGlobal: `products:read:${PERMISSION_SCOPE.Global}`,
  ProductsCreateGlobal: `products:create:${PERMISSION_SCOPE.Global}`,
  ProductsUpdateGlobal: `products:update:${PERMISSION_SCOPE.Global}`,
  ProductsDeleteGlobal: `products:delete:${PERMISSION_SCOPE.Global}`,
  ProductsReadTenant: `products:read:${PERMISSION_SCOPE.Tenant}`,
  ProductsCreateTenant: `products:create:${PERMISSION_SCOPE.Tenant}`,
  ProductsUpdateTenant: `products:update:${PERMISSION_SCOPE.Tenant}`,
  ProductsDeleteTenant: `products:delete:${PERMISSION_SCOPE.Tenant}`,

  // Warehouses

  WarehousesReadGlobal: `warehouses:read:${PERMISSION_SCOPE.Global}`,
  WarehousesCreateGlobal: `warehouses:create:${PERMISSION_SCOPE.Global}`,
  WarehousesUpdateGlobal: `warehouses:update:${PERMISSION_SCOPE.Global}`,
  WarehousesDeleteGlobal: `warehouses:delete:${PERMISSION_SCOPE.Global}`,
  WarehousesReadTenant: `warehouses:read:${PERMISSION_SCOPE.Tenant}`,
  WarehousesCreateTenant: `warehouses:create:${PERMISSION_SCOPE.Tenant}`,
  WarehousesUpdateTenant: `warehouses:update:${PERMISSION_SCOPE.Tenant}`,
  WarehousesDeleteTenant: `warehouses:delete:${PERMISSION_SCOPE.Tenant}`,

  // Suppliers

  SuppliersReadGlobal: `suppliers:read:${PERMISSION_SCOPE.Global}`,
  SuppliersCreateGlobal: `suppliers:create:${PERMISSION_SCOPE.Global}`,
  SuppliersUpdateGlobal: `suppliers:update:${PERMISSION_SCOPE.Global}`,
  SuppliersDeleteGlobal: `suppliers:delete:${PERMISSION_SCOPE.Global}`,
  SuppliersReadTenant: `suppliers:read:${PERMISSION_SCOPE.Tenant}`,
  SuppliersCreateTenant: `suppliers:create:${PERMISSION_SCOPE.Tenant}`,
  SuppliersUpdateTenant: `suppliers:update:${PERMISSION_SCOPE.Tenant}`,
  SuppliersDeleteTenant: `suppliers:delete:${PERMISSION_SCOPE.Tenant}`,
} as const;

export const PERMISSION_ACTIONS = Object.values(PERMISSION_ACTION);

export const INVENTORY_MOVEMENT_TYPE = {
  Receipt: "receipt",
  Issue: "issue",
  Adjustment: "adjustment",
  TransferIn: "transfer_in",
  TransferOut: "transfer_out",
} as const;

export const INVENTORY_MOVEMENT_TYPES = Object.values(INVENTORY_MOVEMENT_TYPE);

export const PURCHASE_ORDER_STATUS = {
  Draft: "draft",
  Ordered: "ordered",
  Partial: "partial",
  Received: "received",
  Cancelled: "cancelled",
} as const;

export const PURCHASE_ORDER_STATUSES = Object.values(PURCHASE_ORDER_STATUS);
