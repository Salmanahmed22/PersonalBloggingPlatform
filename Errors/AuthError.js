class AuthError extends Error {
  constructor(message, statusCode = 401, errorCode = "AUTH_ERROR") {
    super(message);
    this.name = "AuthError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

module.exports = AuthError;