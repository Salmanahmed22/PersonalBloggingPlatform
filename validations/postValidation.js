const { body, param } = require("express-validator");

const createPostValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
];

const updatePostValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
];

const postIdValidation = [
  param("id").isMongoId().withMessage("Post id must be a valid MongoDB ObjectId"),
];

module.exports = {
  createPostValidation,
  updatePostValidation,
  postIdValidation,
};