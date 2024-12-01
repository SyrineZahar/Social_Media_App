const express = require("express");
const router = express.Router();
const {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} = require( "../Services/commentService")


router.post("/",  (req, res) => createComment(req, res)); 
router.get("/post/:postId",  (req, res) => getCommentsByPost(req, res)); 
router.put("/:commentId",  (req, res) => updateComment(req, res)); 
router.delete("/:commentId", (req, res) => deleteComment(req, res)); 


module.exports = router;
