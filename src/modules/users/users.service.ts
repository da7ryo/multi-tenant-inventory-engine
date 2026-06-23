import { findUserByEmail } from "./users.repo";

export async function getUserByEmail(email: string) {
  const user = await findUserByEmail(email);
  return user;
}
