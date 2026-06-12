const AuthError = require("./AuthError");

class MissingTokenError extends AuthError {
  constructor() {
    super("Authorization token is required", 401, "TOKEN_MISSING");
    this.name = "MissingTokenError";
  }
}

module.exports = MissingTokenError;