const express = require("express");
const router = express.Router();
const upload = require('../middlewares/multer'); 
const { createPost } = require("../Services/PostService")

router.post('/', upload.fields([{ name: 'images' }, { name: 'videos' }]), createPost);

router.get("/", (req, res) => getAllPosts(req, res));

router.get("/:id", (req, res) => getPostById(req, res));

router.put("/:id", (req, res) => updatePost(req, res));

router.delete("/:id", (req, res) => deletePost(req, res));

module.exports = router;
