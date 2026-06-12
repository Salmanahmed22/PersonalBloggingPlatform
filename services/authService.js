const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userRepo = require("../repos/userRepo");
const EmailAlreadyExistsError = require("../Errors/EmailAlreadyExistsError");
const InvalidCredentialsError = require("../Errors/InvalidCredentialsError");

const sanitizeUser = (user) => {
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

const registerUser = async ({ username, email, password }) => {
  const existingUser = await userRepo.getUserByEmail(email);

  if (existingUser) {
    throw new EmailAlreadyExistsError();
  }

  const user = await userRepo.createUser(username, email, password);
  return sanitizeUser(user);
};

const loginUser = async ({ email, password }) => {
  const user = await userRepo.getUserByEmail(email);

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new InvalidCredentialsError();
  }
  //token creat
  const token = jwt.sign(
    {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: sanitizeUser(user),
  };
};

module.exports = {
  registerUser,
  loginUser,
};