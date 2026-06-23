export const CONFIG = {
  DB_URL: process.env.DB_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN),
};
