// const express = require("express");

// const router = express.Router();

// // Create a comment
// router.post("/", async (req, res) => {
//   try {
//     const { description, postId } = req.body;

//     // Validate the input
//     if (!description || !postId) {
//       return res.status(400).json({ message: "Description and Post ID are required" });
//     }

//     // Find the post to ensure it exists
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     // Create a new comment
//     const newComment = new Comment({
//       description,
//       UserId: req.user._id, // Assuming user info is attached to the request (e.g., by a JWT middleware)
//       PostId: postId,
//     });

//     // Save the comment
//     await newComment.save();
//     return res.status(201).json(newComment); // Respond with the created comment
//   } catch (err) {
//     return res.status(500).json({ message: "Server error", error: err });
//   }
// });

// // Get comments by Post ID
// router.get("/post/:postId", async (req, res) => {
//   try {
//     const { postId } = req.params;

//     // Find the comments for the specified post
//     const comments = await Comment.find({ PostId: postId }).populate("UserId", "username email");
//     if (!comments || comments.length === 0) {
//       return res.status(404).json({ message: "No comments found for this post" });
//     }

//     return res.status(200).json(comments); // Respond with the comments found
//   } catch (err) {
//     return res.status(500).json({ message: "Server error", error: err });
//   }
// });

// // Update a comment (only the creator can update)
// router.put("/:commentId", async (req, res) => {
//   try {
//     const { commentId } = req.params;
//     const { description } = req.body;

//     // Find the comment to update
//     const comment = await Comment.findById(commentId);
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }

//     // Check if the current user is the creator of the comment
//     if (comment.UserId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "You are not authorized to update this comment" });
//     }

//     // Update the comment
//     comment.description = description || comment.description;  // Only update if description is provided
//     await comment.save();

//     return res.status(200).json(comment); // Respond with the updated comment
//   } catch (err) {
//     return res.status(500).json({ message: "Server error", error: err });
//   }
// });

// // Delete a comment (only the creator can delete)
// router.delete("/:commentId", async (req, res) => {
//   try {
//     const { commentId } = req.params;

//     // Find the comment to delete
//     const comment = await Comment.findById(commentId);
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }

//     // Check if the current user is the creator of the comment
//     if (comment.UserId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "You are not authorized to delete this comment" });
//     }

//     // Delete the comment
//     await comment.remove();

//     return res.status(200).json({ message: "Comment deleted successfully" }); // Respond with success message
//   } catch (err) {
//     return res.status(500).json({ message: "Server error", error: err });
//   }
// });

