const { body } = require("express-validator");

const registerValidation = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email").trim().isEmail().withMessage("Email must be in a valid format"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
];

const loginValidation = [
  body("email").trim().isEmail().withMessage("Email must be in a valid format"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  registerValidation,
  loginValidation,
};