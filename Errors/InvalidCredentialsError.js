const AuthError = require("./AuthError");

class InvalidCredentialsError extends AuthError {
  constructor() {
    super("Invalid email or password", 401, "INVALID_CREDENTIALS");
    this.name = "InvalidCredentialsError";
  }
}

module.exports = InvalidCredentialsError;