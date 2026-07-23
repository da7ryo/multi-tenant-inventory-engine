import { LoginUserRequestBody } from "./users.types";
import { findUserByEmail } from "../../core/db/db.repo";
import { dbClient } from "../../singletons";
import {
  UserAuthInfoValidator,
  UserAuthWithRoleAndPermissionsReadValidator,
} from "./users.validator";
import { comparePasswords, createToken } from "./users.utils";
import { CONFIG } from "../../core/config";
import { AppError } from "../../core/error/error.service";
import { HTTP_STATUS_CODE } from "../../core/http/http.constants";

export async function getUserAuthByEmail(email: string) {
  const retrivedUser = await findUserByEmail({ dbClient, options: { email } });
  if (!retrivedUser) {
    return null;
  }

  const parsedUser =
    UserAuthWithRoleAndPermissionsReadValidator.parse(retrivedUser);

  return parsedUser;
}

export async function loginUser(params: LoginUserRequestBody) {
  const { email, password } = params;

  const user = await getUserAuthByEmail(email);

  if (!user || !(await comparePasswords(password, user.password))) {
    throw new AppError(
      "Incorrect email or password",
      HTTP_STATUS_CODE.BAD_REQUEST,
    );
  }

  const accessToken = createToken({
    userId: user.id,
    email: user.email,
    tokenSecret: CONFIG.ACCESS_TOKEN_SECRET,
    tokenExpiresIn: CONFIG.ACCESS_TOKEN_EXPIRES_IN,
  });

  const refreshToken = createToken({
    userId: user.id,
    email: user.email,
    tokenSecret: CONFIG.REFRESH_TOKEN_SECRET,
    tokenExpiresIn: CONFIG.REFRESH_TOKEN_EXPIRES_IN,
  });

  const userAuthInfo = {
    accessToken,
    refreshToken,
  };

  const parsedUserAuthInfo = UserAuthInfoValidator.parse(userAuthInfo);

  return parsedUserAuthInfo;
}
