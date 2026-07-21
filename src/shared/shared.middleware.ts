import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";

export function parseRequestIdFromRequest(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const requestId = randomUUID();

  res.locals.requestId = requestId;

  res.setHeader("X-Request-Id", requestId);

  next();
}
