import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "./error.service";
import {
  HTTP_STATUS_CODE,
  HTTP_STATUS_CODE_TEXT,
} from "../http/http.constants";
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

  return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    status: HTTP_STATUS_CODE_TEXT.ERROR,
    message: "Something went wrong!",
  });
}
