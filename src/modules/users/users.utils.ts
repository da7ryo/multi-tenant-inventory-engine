import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisify } from "node:util";
import { StringValue } from "ms";

export async function comparePasswords(
  password: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(password, hashedPassword);
}

export function createToken(params: {
  userId: string;
  email: string;
  tokenSecret: string;
  tokenExpiresIn: StringValue;
}) {
  const { userId, email, tokenSecret, tokenExpiresIn } = params;

  return jwt.sign({ userId, email }, tokenSecret, {
    expiresIn: tokenExpiresIn,
  });
}

export async function decodeToken(token: string, secret: string) {
  const verify = promisify(jwt.verify) as (
    token: string,
    secret: string,
  ) => any;

  const decodedToken = await verify(token, secret);

  return decodedToken;
}
