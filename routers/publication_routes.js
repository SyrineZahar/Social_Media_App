const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  deletePost,
  editPost,
  acceptPost,
} = require("../Controller/PostController");
const { isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/multer");
const {protect} = require("../middlewares/auth");

router.post("/", upload.single("image"),protect, createPost);

router.get("/", isAdmin, getAllPosts);

router.put("/:id", editPost);

router.delete("/:id", deletePost);

router.post("/accept/:id", acceptPost);

module.exports = router;
