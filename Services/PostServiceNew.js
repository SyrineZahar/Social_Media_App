const Post = require("../models/Post");
const BaseRessource = require("../models/Ressource");
const Image = require("../models/Image");
const Video = require("../models/Video");
const path = require("path");
const Comment = require("../models/Comment"); 
const Like = require("../models/Like");

async function createPost(req, res) {
  try {
    const { description } = req.body;
    let resourceId = null;
    const userId = req.user.userId; 
    console.log("id",userId);

    if (req.file) {
      const { filename, size } = req.file;
      const fileExtension = path.extname(filename).toLowerCase();

      if ([".png", ".jpg", ".jpeg"].includes(fileExtension)) {
        const image = await Image.create({
          Url: `/uploads/${filename}`,
          Size: size.toString(),
          resolution: "1920x1080",
        });
        resourceId = image._id;
      } else if ([".mp4", ".avi", ".mkv"].includes(fileExtension)) {
        const video = await Video.create({
          Url: `/uploads/${filename}`,
          Size: size.toString(),
          duration: 120,
        });
        resourceId = video._id;
      } else {
        return res.status(400).json({ error: "Unsupported file type" });
      }
    }

    const post = await Post.create({
      Description: description,
      ressources: resourceId ? [resourceId] : [],
      UserId: userId,
      validate: false,
    });

    res.status(200).json({ message: "Post added", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find({ validate: false })
    .populate({
      path: "UserId", 
      model: "BaseUser", 
      select: "firstName lastName", 
    })
      .populate({
        path: "ressources",
        model: "BaseRessource", 
        select: "-__v -createdAt -updatedAt",
      })
      
      .exec();

      console.log(posts)
    res.status(200).render("posts", { posts });
    
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

async function acceptPost(req, res) {
  try {
    const postId = req.params.id;

    const post = await Post.findByIdAndUpdate(
      postId,
      { validate: true },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post accepted", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to accept post" });
  }
}

async function editPost(req, res) {
  try {
    const postId = req.params.id;
    const description = req.body.description;

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    const post = await Post.findByIdAndUpdate(postId, {
      Description: description,
    });

    res.status(200).json({ message: "Post updated", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update post" });
  }
}

async function deletePost(req, res) {
  try {
    const postId = req.params.id;


    const deletedComments = await Comment.deleteMany({ postId });

    const deletedLikes = await Like.deleteMany({ postId });

    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Failed to delete post", details: err.message });
  }
}



module.exports = { createPost, getAllPosts, deletePost, editPost, acceptPost };
