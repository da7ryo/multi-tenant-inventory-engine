import { Request, Response } from "express";
import { getUserByEmail } from "../users/users.service";
import { AppError } from "../../core/error/app-error";
import { HttpStatusCode } from "../../core/http";
import { compareHashedData, createToken, hashInputData } from "./auth.utils";

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
