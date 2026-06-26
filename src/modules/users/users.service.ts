import { findUserByEmail, findUserPermisions } from "./users.repo";

export async function getUserByEmail(email: string) {
  const user = await findUserByEmail(email);
  return user;
}

export async function getUserPermissions(userId: string) {
  return await findUserPermisions(userId);
}
