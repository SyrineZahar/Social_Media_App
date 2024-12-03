const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/auth");



const {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} = require("../Services/commentService");

router.post("/", protect, createComment);
router.get("/:postId", getCommentsByPost);
router.put("/:commentId",protect, updateComment);
router.delete("/:commentId",protect, deleteComment);

module.exports = router;
