import { NextFunction, Request, Response } from "express";
import { getUserByEmail, getUserPermissions } from "../users/users.service";
import { AppError } from "../../core/error/app-error";
import { HttpStatusCode } from "../../core/http";
import {
  compareHashedData,
  createToken,
  decodeToken,
  hashInputData,
} from "./auth.utils";
import { email } from "zod";
import { PermissionEnum } from "../../core/db";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user || !(await compareHashedData(password, user.password))) {
    throw new AppError(
      "Incorrect email or password",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  delete (user as unknown as { password?: string }).password;
  const token = createToken(user);

  return res.json({ token });
}

export async function protect(req: Request, res: Response, next: NextFunction) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    throw new AppError(
      "You are not logged in. Please log in to get access",
      HttpStatusCode.UNAUTHORIZED,
    );

  const decoded = await decodeToken(token);

  const currentUser = await getUserByEmail(decoded.email);

  if (!currentUser)
    throw new AppError(
      "User belonging to this token does not longer exist",
      HttpStatusCode.UNAUTHORIZED,
    );

  // TODO: add here check for password update after token was issued

  res.locals.user = currentUser;

  next();
}

export function restrictTo(selectedPermissions: PermissionEnum[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = res.locals.user;

    const permissions = await getUserPermissions(currentUser.id);

    const permission = permissions.find((p) =>
      selectedPermissions.includes(p.action as PermissionEnum),
    );

    if (!permission) {
      throw new AppError(
        "You are not allowed to perform this action",
        HttpStatusCode.FORBIDDEN,
      );
    }
    next();
  };
}
