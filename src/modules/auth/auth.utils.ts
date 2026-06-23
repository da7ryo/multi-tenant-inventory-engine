import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CONFIG } from "../../core/config";

export async function hashInputData(inputData: string) {
  return await bcrypt.hash(inputData, 10);
}

export async function compareHashedData(inputData: string, hashedData: string) {
  return await bcrypt.compare(inputData, hashedData);
}

export function createToken(payload: Record<string, any>) {
  return jwt.sign(payload, CONFIG.JWT_SECRET, {
    expiresIn: CONFIG.JWT_EXPIRES_IN,
  });
}
