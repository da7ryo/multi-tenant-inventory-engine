import {
  HTTP_STATUS_CODE,
  HTTP_STATUS_CODE_TEXT,
} from "../http/http.constants";

export class AppError extends Error {
  statusCode: HTTP_STATUS_CODE;
  status: HTTP_STATUS_CODE_TEXT;
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
      ? HTTP_STATUS_CODE_TEXT.FAIL
      : HTTP_STATUS_CODE_TEXT.ERROR;
    this.payload = payload;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
