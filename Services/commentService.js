const Post = require("../models/Post");
const Comment = require("../models/Comment");

async function createComment(req, res) {
  try {
    const { description, postId } = req.body;

    if (!description || !postId) {
      return res
        .status(400)
        .json({ message: "Description and Post ID are required" });
    }

    const newComment = new Comment({
      description,
      UserId: req.user._id,
      PostId: postId,
    });

    await newComment.save();
    return res.status(201).json(newComment);
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message, 
    });
  }
}

async function getCommentsByPost(req, res) {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ PostId: postId }).populate(
      "UserId",
      "username email"
    );
    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this post" });
    }

    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
}

async function updateComment(req, res) {
  try {
    const { commentId } = req.params;
    const { description } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.UserId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this comment" });
    }

    comment.description = description || comment.description;
    await comment.save();

    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
}

async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.UserId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
    }

    await comment.remove();

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
}

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
};
