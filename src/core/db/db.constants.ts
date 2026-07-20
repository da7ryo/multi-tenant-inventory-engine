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
