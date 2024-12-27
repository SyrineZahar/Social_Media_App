const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const {
  createLike,
  getLikesByPost,
  deleteLike,
} = require("../Controller/likeController");
router.post("/", protect, createLike);

router.get("/:postId",protect, getLikesByPost);

router.delete("/:postId", protect, deleteLike);

module.exports = router;
