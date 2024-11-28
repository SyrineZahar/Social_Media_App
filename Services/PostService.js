const { Post } = require("../models/Post");

const createPost = async (req, res) => {
    try {
        const result = await Post.create(req.body);
        res.json(result);
    } catch (error) {
        res.send(error);
    }
};


const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error occurred while fetching posts", details: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "Error occurred while fetching the post", details: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found or no changes made" });
        }

        res.status(200).json({ message: "Post updated successfully", updatedPost });
    } catch (error) {
        res.status(500).json({ error: "Error occurred while updating the post", details: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error occurred while deleting the post", details: error.message });
    }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
