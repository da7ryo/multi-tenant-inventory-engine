import type { Request, Response, NextFunction } from "express";
import { LoginUserRequestBodyValidator } from "./users.validator";

export function validateLoginUserRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedBody = LoginUserRequestBodyValidator.parse(req.body);
  res.locals.reqBody = parsedBody;
  next();
}
