const postRepo = require("../repos/PostRepo");

const getPosts = async () => {
  return await postRepo.getPosts();
};

const createPost = async ({ title, content, authorID }) => {
  return await postRepo.createPost(title, content, authorID);
};

const updatePost = async (postId, body) => {
  const post = await postRepo.updatePost(postId, body);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  return post;
};

const deletePost = async (postId) => {
  const post = await postRepo.deletePost(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  return post;
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};