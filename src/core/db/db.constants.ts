export const PERMISSION_SCOPE = {
  Global: "global",
  Tenant: "tenant",
} as const;

export const PERMISSION_ACTION = {
  TenantsReadGlobal: `tenants:read:${PERMISSION_SCOPE.Global}`,
  TenantsCreateGlobal: `tenants:create:${PERMISSION_SCOPE.Global}`,
  TenantsUpdateGlobal: `tenants:update:${PERMISSION_SCOPE.Global}`,
  TenantsDeleteGlobal: `tenants:delete:${PERMISSION_SCOPE.Global}`,
  TenantsReadTenant: `tenants:read:${PERMISSION_SCOPE.Tenant}`,
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
