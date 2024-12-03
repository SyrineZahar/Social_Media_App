const Comment = require("../models/Comment");
const Like = require("../models/Like");
const Post = require("../models/Post");

async function handleDeletePost(postId) {
  try {
    await Comment.deleteMany({ postId });
    await Like.deleteMany({ postId });

    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    return { success: true, message: "Post deleted successfully" };
  } catch (err) {
    console.error("Error in handlePostDeletion:", err);
    throw new Error(err.message);
  }
}

module.exports = { handleDeletePost };
