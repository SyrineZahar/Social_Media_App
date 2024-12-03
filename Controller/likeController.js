const Like = require("../models/Like");
const Post = require("../models/Post");

async function createLike(req, res) {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    

    const userId = req.user.userId;

    const existingLike = await Like.findOne({ postId, userId });

    if (existingLike) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    const newLike = new Like({
      userId,
      postId,
    });

    await newLike.save();
    return res.status(201).json(newLike);
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

async function getLikesByPost(req, res) {
  try {
    const { postId } = req.params;

    const likes = await Like.find({ postId: postId }).populate("userId", "firstName lastName email");

    if (!likes || likes.length === 0) {
      return res.status(404).json({ message: "No likes found for this post" });
    }

    return res.status(200).json(likes);
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

async function deleteLike(req, res) {
  try {
    const { postId } = req.params;

    const userId = req.user.userId;

    const like = await Like.findOne({ postId, userId });

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    await Like.deleteOne({ _id: like._id });

    return res.status(200).json({ message: "Like removed successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

module.exports = {
  createLike,
  getLikesByPost,
  deleteLike,
};
