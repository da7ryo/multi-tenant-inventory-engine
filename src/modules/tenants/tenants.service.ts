import {
  CreateTenantRequestBody,
  GetTenantRequestQuery,
} from "./tenants.types";
import { insertTenant, findTenants } from "../../core/db/db.repo";
import { dbClient } from "../../singletons";
import { TenantReadValidator } from "./tenants.validator";

export async function getTenants(params: { reqQuery: GetTenantRequestQuery }) {
  const { reqQuery } = params;

  const retrievedTenants = await findTenants({ dbClient, options: reqQuery });

  return retrievedTenants;
}

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
