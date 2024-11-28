const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require("../Services/PostService")

router.post("/", (req, res) => createPost(req, res));

router.get("/", (req, res) => getAllPosts(req, res));

router.get("/:id", (req, res) => getPostById(req, res));

router.put("/:id", (req, res) => updatePost(req, res));

router.delete("/:id", (req, res) => deletePost(req, res));

module.exports = router;
