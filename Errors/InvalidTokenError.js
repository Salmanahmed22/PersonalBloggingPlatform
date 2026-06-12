const AuthError = require("./AuthError");

class InvalidTokenError extends AuthError {
  constructor() {
    super("Invalid or expired token", 401, "TOKEN_INVALID");
    this.name = "InvalidTokenError";
  }
}

module.exports = InvalidTokenError;