import { CreateTenantRequestBody } from "./tenants.types";
import { insertTenant } from "../../core/db/db.repo";
import { dbClient } from "../../singletons";
import { TenantReadValidator } from "./tenants.validator";

export async function createTenant(params: {
  reqBody: CreateTenantRequestBody;
}) {
  const { reqBody } = params;

  const createdTenant = await insertTenant({
    dbClient,
    tenantInsertData: reqBody,
  });

  const parsedTenant = TenantReadValidator.parse(createdTenant);

  return parsedTenant;
}
