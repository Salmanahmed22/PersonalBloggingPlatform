const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || (error.name === "ValidationError" ? 400 : 500);
  const isAuthError = statusCode === 401 || statusCode === 403 || error.name?.includes("Auth") || error.errorCode;

  if (error.code === 11000) {
    return res.status(409).json({ error: "Duplicate key error" });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Invalid identifier" });
  }

  if (isAuthError) {
    return res.status(statusCode).json({
      error: error.message || "Authentication failed",
      code: error.errorCode || error.name || "AUTH_ERROR",
    });
  }

  return res.status(statusCode).json({
    error: error.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;