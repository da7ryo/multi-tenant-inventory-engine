import { db, TenantCreateDb, tenants, users } from "../../core/db";
import { eq } from "drizzle-orm";

export async function findUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user || null;
}
