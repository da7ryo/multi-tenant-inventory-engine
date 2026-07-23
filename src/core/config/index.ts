import { StringValue } from "ms";

export const CONFIG = {
  NODE_ENV: process.env.NODE_ENV as "development" | "production",
  DB_URL: process.env.DB_URL as string,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as StringValue,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as StringValue,
  PORT: Number(process.env.PORT),
  HOST_URL: process.env.HOST_URL as string,
};
