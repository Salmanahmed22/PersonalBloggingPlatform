const router = require("express").Router();
const authController = require("../controllers/authController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const { registerValidation, loginValidation } = require("../validations/authValidation");

router.post("/register", registerValidation, validationMiddleware, authController.register);
router.post("/login", loginValidation, validationMiddleware, authController.login);

module.exports = router;