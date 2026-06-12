const postRepo = require("../repos/postRepo");

const postOwnerMiddleware = async (req, res, next) => {
  try {
    const post = await postRepo.getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const authorId = post.authorID && post.authorID._id ? post.authorID._id.toString() : post.authorID.toString();

    if (authorId !== req.user.id) {
      return res.status(403).json({ error: "You are not allowed to modify this post" });
    }

    req.post = post;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = postOwnerMiddleware;