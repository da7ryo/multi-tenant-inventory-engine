import { ZodError } from "zod";
import { AppError } from "./error.service";
import { HTTP_STATUS_CODE } from "../http/http.constants";

export function parseError(error: Error) {
  if (error instanceof AppError) return error;

  if (error instanceof ZodError) {
    console.log(error.issues);
    const message = error.issues.map((issue) => issue.message).join(" ");
    return new AppError(message, HTTP_STATUS_CODE.BAD_REQUEST);
  }

  if (error.name === "JsonWebTokenError") {
    return new AppError(
      "This is not a valid token. Please log in again.",
      HTTP_STATUS_CODE.BAD_REQUEST,
    );
  }

  if (error.name === "TokenExpiredError" && error.message === "jwt expired") {
    return new AppError(
      "Your token has expired! Please, log in again.",
      HTTP_STATUS_CODE.UNAUTHORIZED,
    );
  }

  console.log(error);
  return error;
}
