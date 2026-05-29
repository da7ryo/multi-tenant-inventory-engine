import { HttpStatusCode, HttpStatusCodeText } from "../http";

export class AppError extends Error {
  statusCode: HttpStatusCode;
  status: HttpStatusCodeText;
  payload?: Record<string, any>;
  isOperational: boolean;
  [key: string]: any;

  constructor(
    message: string,
    statusCode: number,
    payload?: Record<string, any>,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4")
      ? HttpStatusCodeText.FAIL
      : HttpStatusCodeText.ERROR;
    this.payload = payload;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
