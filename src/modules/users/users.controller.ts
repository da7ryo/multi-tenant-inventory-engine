import { Request, Response } from "express";
import { LoginUserRequestBody } from "./users.types";
import * as usersService from "./users.service";
import { HTTP_STATUS_CODE_TEXT } from "../../core/http/http.constants";
import { CONFIG } from "../../core/config";
import ms from "ms";
import { LoginUserResponseValidator } from "./users.validator";

export async function loginUser(_req: Request, res: Response) {
  const reqBody = res.locals.reqBody as LoginUserRequestBody;

  const data = await usersService.loginUser(reqBody);

  const response = {
    success: HTTP_STATUS_CODE_TEXT.SUCCESS,
    data,
  };

  const parsedResponse = LoginUserResponseValidator.parse(response);

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: CONFIG.NODE_ENV === "production",
    maxAge: ms(CONFIG.REFRESH_TOKEN_EXPIRES_IN),
  });

  res.json(parsedResponse);
}
