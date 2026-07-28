import { HTTP_STATUS_CODE_TEXT } from "../../core/http/http.constants";
import { z } from "../../shared/shared.validator";
import { RoleWithPermissionsReadValidator } from "../roles/roles.validator";

export const UserReadValidator = z
  .object({
    id: z.string(),
    email: z.string(),
    isActive: z.boolean(),
    roleId: z.string(),
    tenantId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .openapi("UserRead");

export const UserWithRoleAndPermissionsReadValidator = UserReadValidator.extend(
  {
    role: RoleWithPermissionsReadValidator,
  },
).openapi("UserWithRoleAndPermissionsRead");

export const UserAuthReadValidator = UserReadValidator.extend({
  password: z.string(),
}).openapi("UserAuthRead");

export const UserAuthWithRoleAndPermissionsReadValidator =
  UserAuthReadValidator.extend({
    role: RoleWithPermissionsReadValidator,
  }).openapi("UserAuthWithRoleAndPermissionsRead");

export const LoginUserRequestBodyValidator = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .strict()
  .openapi("LoginUserRequestBody");

export const UserAuthInfoValidator = z
  .object({
    accessToken: z.string(),
    refreshToken: z.string(),
  })
  .openapi("UserAuthInfo");

export const LoginUserResponseValidator = z
  .object({
    success: z.literal(HTTP_STATUS_CODE_TEXT.SUCCESS),
    data: UserAuthInfoValidator,
  })
  .openapi("LoginUserResponse");

export const GetMeResponseValidator = z
  .object({
    success: z.literal(HTTP_STATUS_CODE_TEXT.SUCCESS),
    data: UserWithRoleAndPermissionsReadValidator,
  })
  .openapi("GetMeResponse");

export const RefreshTokenRequestCookiesValidator = z
  .object({
    refreshToken: z.string(),
  })
  .openapi("RefreshTokenRequestCookies");

export const RefreshTokenResponseValidator = z
  .object({
    success: z.literal(HTTP_STATUS_CODE_TEXT.SUCCESS),
    data: UserAuthInfoValidator,
  })
  .openapi("RefreshTokenResponse");

export const LogoutUserResponseValidator = z
  .object({
    success: z.literal(HTTP_STATUS_CODE_TEXT.SUCCESS),
    data: z
      .object({
        message: z.string(),
      })
      .openapi("LogoutUserResponseData"),
  })
  .openapi("LogoutUserResponse");
