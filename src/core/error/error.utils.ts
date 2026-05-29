import { ZodError } from "zod";
import { AppError } from "./app-error";
import { HttpStatusCode } from "../http";

export function parseError(error: Error) {
  if (error instanceof AppError) return error;

  if (error instanceof ZodError) {
    console.log(error.issues);
    const message = error.issues.map((issue) => issue.message).join(" ");
    return new AppError(message, HttpStatusCode.BAD_REQUEST);
  }

  return error;
}
