export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  NOT_FOUND = 'NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  PARSE_ERROR = 'PARSE_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  JWT_VERIFICATION_ERROR = 'JWT_VERIFICATION_ERROR',
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
  USERNAME_ALREADY_EXISTS = 'USERNAME_ALREADY_EXISTS',
  MISSING_REQUIRED_FIELDS = 'MISSING_REQUIRED_FIELDS',
  INVALID_FIELDS_VALUE = 'INVALID_FIELDS_VALUE',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
}