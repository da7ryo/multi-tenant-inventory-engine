import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisify } from "node:util";
import { StringValue } from "ms";
import type { CookieOptions } from "express";
import { CONFIG } from "../../core/config";
import { REFRESH_TOKEN_COOKIE_PATH } from "./users.constants";

export async function hashPassword(inputData: string) {
  return await bcrypt.hash(inputData, 10);
}

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

export function getRefreshTokenCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: CONFIG.NODE_ENV !== "development",
    path: REFRESH_TOKEN_COOKIE_PATH,
    sameSite: CONFIG.NODE_ENV === "development" ? "lax" : "none",
  };
}
