const postService = require("../services/postService");

const getPosts = async (req, res) => {
  const posts = await postService.getPosts();

  return res.status(200).json({
    message: "Posts retrieved successfully",
    posts,
  });
};

const createPost = async (req, res) => {
  const post = await postService.createPost({
    title: req.body.title,
    content: req.body.content,
    authorID: req.user.id,
  });

  return res.status(201).json({
    message: "Post created successfully",
    post,
  });
};

const updatePost = async (req, res) => {
  const post = await postService.updatePost(req.params.id, {
    title: req.body.title,
    content: req.body.content,
  });

  return res.status(200).json({
    message: "Post updated successfully",
    post,
  });
};

const deletePost = async (req, res) => {
  await postService.deletePost(req.params.id);

  return res.status(200).json({
    message: "Post deleted successfully",
  });
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};