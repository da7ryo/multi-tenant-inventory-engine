import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
  ZodContentObject,
} from "@asteasolutions/zod-to-openapi";
import { DocsHttpMethod, RegisterRouteParams } from "./api-docs.types";
import { HTTP_STATUS_CODE } from "../http/http.constants";

export class ApiDocs {
  private readonly _registry: OpenAPIRegistry;
  private readonly _badRequestValidator: NonNullable<
    ZodContentObject["application/json"]
  >["schema"];
  private readonly _internalServerErrorValidator: NonNullable<
    ZodContentObject["application/json"]
  >["schema"];
  private readonly _hostUrl: string;
  private readonly _title: string;
  private readonly _version: string;
  private readonly _externalUrl: string;

  constructor(params: {
    hostUrl: string;
    title: string;
    version: string;
    externalUrl: string;
    badRequestValidator: NonNullable<
      ZodContentObject["application/json"]
    >["schema"];
    internalServerErrorValidator: NonNullable<
      ZodContentObject["application/json"]
    >["schema"];
  }) {
    const {
      badRequestValidator,
      internalServerErrorValidator,
      hostUrl,
      title,
      version,
      externalUrl,
    } = params;
    this._registry = new OpenAPIRegistry();

    this._registry.registerComponent("securitySchemes", "bearerAuth", {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    });

    this._badRequestValidator = badRequestValidator;
    this._internalServerErrorValidator = internalServerErrorValidator;
    this._hostUrl = hostUrl;
    this._title = title;
    this._version = version;
    this._externalUrl = externalUrl;
  }

  private buildRequestConfig(params: RegisterRouteParams) {
    const { body, params: reqParams, query } = params;

    if (body || params || query) {
      return {
        params: reqParams,
        query,
        ...(body
          ? {
              body: {
                content: {
                  "application/json": {
                    schema: body,
                  },
                },
              },
            }
          : {}),
      };
    }

    return undefined;
  }

  private getHttpStatusCodeFromDocsHttpMethod(method: DocsHttpMethod) {
    switch (method) {
      case "get":
      case "patch":
        return HTTP_STATUS_CODE.OK;
      case "delete":
        return HTTP_STATUS_CODE.NO_CONTENT;
      case "post":
        return HTTP_STATUS_CODE.CREATED;
      default:
        return HTTP_STATUS_CODE.OK;
    }
  }

  private buildResponseConfig(params: RegisterRouteParams) {
    return {
      [this.getHttpStatusCodeFromDocsHttpMethod(params.method)]: {
        description: params.responseDescription,
        ...(params.response
          ? {
              content: {
                "application/json": {
                  schema: params.response,
                },
              },
            }
          : {}),
      },
      [HTTP_STATUS_CODE.BAD_REQUEST]: {
        description: "BAD REQUEST: Client error",
        content: {
          "application/json": {
            schema: this._badRequestValidator,
          },
        },
      },
      [HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR]: {
        description: "INTERNAL SERVER ERROR: Server error",
        content: {
          "application/json": {
            schema: this._internalServerErrorValidator,
          },
        },
      },
    };
  }

  registerRoute(params: RegisterRouteParams) {
    let finalDescription = params.description;

    if (params.permissions && params.permissions.length > 0) {
      const permissionsList = params.permissions
        .map((p) => `\`${p}\``)
        .join(", ");
      finalDescription += `\n\n**Allowed Permissions:** ${permissionsList}`;
    }

    this._registry.registerPath({
      method: params.method,
      path: params.path,
      tags: params.tags,
      description: finalDescription,
      request: this.buildRequestConfig(params),
      responses: this.buildResponseConfig(params),
      ...(params.isProtected ? { security: [{ bearerAuth: [] }] } : {}),
    });
  }
}
