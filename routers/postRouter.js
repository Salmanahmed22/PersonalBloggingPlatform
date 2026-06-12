const router = require("express").Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");
const postOwnerMiddleware = require("../middlewares/postOwnerMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");
const { createPostValidation, updatePostValidation, postIdValidation } = require("../validations/postValidation");

router.get("/", postController.getPosts);
router.post("/", authMiddleware, createPostValidation, validationMiddleware, postController.createPost);
router.put("/:id", authMiddleware, postIdValidation, validationMiddleware, postOwnerMiddleware, updatePostValidation, validationMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postIdValidation, validationMiddleware, postOwnerMiddleware, postController.deletePost);

module.exports = router;
