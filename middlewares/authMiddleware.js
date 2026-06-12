const jwt = require("jsonwebtoken");
const MissingTokenError = require("../Errors/MissingTokenError");
const InvalidTokenError = require("../Errors/InvalidTokenError");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new MissingTokenError());
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
    };
    return next();
  } catch (error) {
    return next(new InvalidTokenError());
  }
};

module.exports = authMiddleware;