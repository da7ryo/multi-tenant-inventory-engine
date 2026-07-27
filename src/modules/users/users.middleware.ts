import type { Request, Response, NextFunction } from "express";
import {
  LoginUserRequestBodyValidator,
  RefreshTokenRequestCookiesValidator,
} from "./users.validator";
import { AppError } from "../../core/error/error.service";
import { decodeToken } from "./users.utils";
import { HTTP_STATUS_CODE } from "../../core/http/http.constants";
import { CONFIG } from "../../core/config";
import { getUserByEmail } from "./users.service";

export function validateLoginUserRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedBody = LoginUserRequestBodyValidator.parse(req.body);
  res.locals.reqBody = parsedBody;
  next();
}

export async function protect(req: Request, res: Response, next: NextFunction) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError(
      "You are not logged in. Please log in to get access.",
      HTTP_STATUS_CODE.UNAUTHORIZED,
    );
  }

  const decodedToken = (await decodeToken(
    token,
    CONFIG.ACCESS_TOKEN_SECRET,
  )) as {
    userId: string;
    email: string;
  };

  const currentUser = await getUserByEmail(decodedToken.email);

  if (!currentUser) {
    throw new AppError(
      "User belonging to this token no longer exists.",
      HTTP_STATUS_CODE.UNAUTHORIZED,
    );
  }

  res.locals.user = currentUser;
  next();
}

export function validateRefreshTokenRequestInput(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsedCookies = RefreshTokenRequestCookiesValidator.safeParse(
    req.cookies,
  );

  if (!parsedCookies.success) {
    throw new AppError(
      "Refresh token is missing or invalid.",
      HTTP_STATUS_CODE.UNAUTHORIZED,
    );
  }

  res.locals.cookies = parsedCookies.data;
  next();
}
