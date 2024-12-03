const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const {
  createLike,
  getLikesByPost,
  deleteLike,
} = require("../Services/likeService");
router.post("/", protect, createLike);

router.get("/:postId", getLikesByPost);

router.delete("/:postId", protect, deleteLike);

module.exports = router;
