import { Request, Response } from "express";
import {
  LoginUserRequestBody,
  RefreshTokenRequestCookies,
} from "./users.types";
import * as usersService from "./users.service";
import { HTTP_STATUS_CODE_TEXT } from "../../core/http/http.constants";
import { CONFIG } from "../../core/config";
import ms from "ms";
import {
  GetMeResponseValidator,
  LoginUserResponseValidator,
  RefreshTokenResponseValidator,
} from "./users.validator";
import { REFRESH_TOKEN_COOKIE_NAME } from "./users.constants";
import { getRefreshTokenCookieOptions } from "./users.utils";

// Controller helpers
function setRefreshTokenCookie(res: Response, refreshToken: string) {
  res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    ...getRefreshTokenCookieOptions(),
    maxAge: ms(CONFIG.REFRESH_TOKEN_EXPIRES_IN),
  });
}

function clearRefreshTokenCookie(res: Response) {
  res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, getRefreshTokenCookieOptions());
}

// Controllers

export async function loginUser(_req: Request, res: Response) {
  const reqBody = res.locals.reqBody as LoginUserRequestBody;

  const data = await usersService.loginUser(reqBody);

  const response = {
    success: HTTP_STATUS_CODE_TEXT.SUCCESS,
    data,
  };

  const parsedResponse = LoginUserResponseValidator.parse(response);

  setRefreshTokenCookie(res, data.refreshToken);

  res.json(parsedResponse);
}

export async function getMe(_req: Request, res: Response) {
  const user = res.locals.user;

  const response = {
    success: HTTP_STATUS_CODE_TEXT.SUCCESS,
    data: user,
  };

  const parsedResponse = GetMeResponseValidator.parse(response);

  res.json(parsedResponse);
}

export async function refreshToken(_req: Request, res: Response) {
  const { refreshToken } = res.locals.cookies as RefreshTokenRequestCookies;

  const data = await usersService.refreshToken(refreshToken);

  const response = {
    success: HTTP_STATUS_CODE_TEXT.SUCCESS,
    data,
  };

  const parsedResponse = RefreshTokenResponseValidator.parse(response);

  setRefreshTokenCookie(res, data.refreshToken);

  res.json(parsedResponse);
}
