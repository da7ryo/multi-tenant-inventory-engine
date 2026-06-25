export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  CONFLICT = 409,
}

export enum HttpStatusCodeText {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error",
}
