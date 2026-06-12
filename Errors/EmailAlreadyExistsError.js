const AuthError = require("./AuthError");

class EmailAlreadyExistsError extends AuthError {
  constructor() {
    super("Email already exists", 409, "EMAIL_ALREADY_EXISTS");
    this.name = "EmailAlreadyExistsError";
  }
}

module.exports = EmailAlreadyExistsError;