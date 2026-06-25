import { ZodError } from "zod";
import { AppError } from "./app-error";
import { HttpStatusCode } from "../http";
import { JsonWebTokenError } from "jsonwebtoken";

export function parseError(error: Error) {
  if (error instanceof AppError) return error;

  if (error instanceof ZodError) {
    console.log(error.issues);
    const message = error.issues.map((issue) => issue.message).join(" ");
    return new AppError(message, HttpStatusCode.BAD_REQUEST);
  }

  if (error.name === "JsonWebTokenError") {
    return new AppError(
      "This is not a valid token. Please log in again.",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  if (error.name === "TokenExpiredError" && error.message === "jwt expired") {
    return new AppError(
      "Your token has expired! Please, log in again.",
      HttpStatusCode.UNAUTHORIZED,
    );
  }

  console.log(error);
  return error;
}
