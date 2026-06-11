const Post = require("../models/Post");
const User = require("../models/User");

const getPosts = async () => {
  try {
    const posts = await Post.find({}, { __v: 0 }).populate("authorID");
    return posts;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getPostById = async (id) => {
  try {
    const post = await Post.findById(id).populate("authorID");
    return post;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getPostsByUser = async (userId) => {
  try {
    const posts = await Post.find({ authorID: userId }, { __v: 0 }).populate("authorID");
    return posts;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createPost = async (title, content, authorID) => {
  try {
    const user = await User.findById(authorID);

    if (!user) {
      throw new Error("User not found");
    }

    const post = await Post.create({ title, content, authorID });

    user.posts.push(post._id);
    await user.save();

    return post;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updatePost = async (id, body) => {
  try {
    const post = await Post.findByIdAndUpdate(id, body, { new: true }).populate("authorID");
    return post;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deletePost = async (id) => {
  try {
    const post = await Post.findByIdAndDelete(id);

    if (post) {
      await User.findByIdAndUpdate(post.authorID, { $pull: { posts: post._id } });
    }

    return post;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getPosts,
  getPostById,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
};