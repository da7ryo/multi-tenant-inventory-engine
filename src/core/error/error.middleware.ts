import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "./app-error";
import { HttpStatusCode, HttpStatusCodeText } from "../http";
import { parseError } from "./error.utils";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const error = parseError(err);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      ...(error.payload ? { payload: error.payload } : {}),
    });
  }

  console.error("ERROR 💥", error);

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    status: HttpStatusCodeText.ERROR,
    message: "Something went wrong!",
  });
}
