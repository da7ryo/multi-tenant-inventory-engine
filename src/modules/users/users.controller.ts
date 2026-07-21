import { Request, Response } from "express";

export async function loginUser(_req: Request, res: Response) {
  const reqBody = res.locals.reqBody;

  const data = await usersService.loginUser(reqBody);

  const response = {
    success: HTTP_STATUS_CODE_TEXT.SUCCESS,
    data,
  };

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: CONFIG.NODE_ENV === "production",
    maxAge: ms(CONFIG.REFRESH_TOKEN_EXPIRES_IN),
  });

  res.json(parsedResponse);
}
