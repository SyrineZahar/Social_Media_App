const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  deletePost,
  editPost,
  getAllPostsUsers,
  acceptPost,
} = require("../Controller/PostController");
const { isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/multer");
const {protect} = require("../middlewares/auth");

router.post("/", upload.single("image"),protect, createPost);

router.get("/", isAdmin, protect,  getAllPosts);

router.get("/postUsers",  protect,  getAllPostsUsers);

router.put("/:id", protect,  editPost);

router.delete("/:id", protect,  deletePost);

router.post("/accept/:id", protect, acceptPost);

module.exports = router;
