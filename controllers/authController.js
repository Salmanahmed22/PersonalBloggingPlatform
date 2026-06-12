const authService = require("../services/authService");

const register = async (req, res) => {
  const user = await authService.registerUser(req.body);

  return res.status(201).json({
    message: "User created successfully",
    user,
  });
};

const login = async (req, res) => {
  const result = await authService.loginUser(req.body);

  return res.status(200).json({
    message: "Login successful",
    ...result,
  });
};

module.exports = {
  register,
  login,
};