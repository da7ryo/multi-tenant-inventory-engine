import { z } from "../../shared/shared.validator";
import {
  UserReadValidator,
  LoginUserRequestBodyValidator,
  LoginUserResponseValidator,
  UserWithRoleAndPermissionsReadValidator,
  UserAuthWithRoleAndPermissionsReadValidator,
  UserAuthReadValidator,
  UserAuthInfoValidator,
  GetMeResponseValidator,
  RefreshTokenRequestCookiesValidator,
  RefreshTokenResponseValidator,
  LogoutUserResponseValidator,
} from "./users.validator";

export type UserRead = z.infer<typeof UserReadValidator>;

export type UserWithRoleAndPermissionsRead = z.infer<
  typeof UserWithRoleAndPermissionsReadValidator
>;

export type UserAuthRead = z.infer<typeof UserAuthReadValidator>;

export type UserAuthWithRoleAndPermissionsRead = z.infer<
  typeof UserAuthWithRoleAndPermissionsReadValidator
>;

export type LoginUserRequestBody = z.infer<
  typeof LoginUserRequestBodyValidator
>;

export type UserAuthInfo = z.infer<typeof UserAuthInfoValidator>;

export type LoginUserResponse = z.infer<typeof LoginUserResponseValidator>;

export type GetMeResponse = z.infer<typeof GetMeResponseValidator>;

export type RefreshTokenRequestCookies = z.infer<
  typeof RefreshTokenRequestCookiesValidator
>;

export type RefreshTokenResponse = z.infer<
  typeof RefreshTokenResponseValidator
>;

export type LogoutUserResponse = z.infer<typeof LogoutUserResponseValidator>;
