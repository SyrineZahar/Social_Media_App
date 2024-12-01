const Post = require('../models/Post');
const Image = require('../models/Image');
const Video = require('../models/Video'); // Assuming you have a Video model

// Create a post with associated resources (images and videos)
const createPost = async (req, res) => {
  try {
    const { date, Description, UserId } = req.body;
    const newPost = new Post({
      date,
      Description,
      UserId,
      ressources: [],
    });

    // Handle images and videos uploads
    if (req.files) {
      const ressources = [];

      // Upload images
      if (req.files['images']) {
        const images = req.files['images'].map((file) => {
          const image = new Image({
            resolution: file.mimetype,
            imageUrl: file.path,
          });
          return image.save();
        });
        ressources.push(...await Promise.all(images));
      }

      // Upload videos
      if (req.files['videos']) {
        const videos = req.files['videos'].map((file) => {
          const video = new Video({
            resolution: file.mimetype,
            videoUrl: file.path,
          });
          return video.save();
        });
        ressources.push(...await Promise.all(videos));
      }

      newPost.ressources = ressources;
    }

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { date, Description } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { date, Description },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Get all posts with populated resources
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('ressources')
      .populate('UserId'); // Optionally populate UserId if needed
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

module.exports = { createPost, updatePost, deletePost, getPosts };
