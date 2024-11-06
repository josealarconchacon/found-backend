const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} = require("../controllers/postController");

// Create post
router.post("/", createPost);

// Get all posts
router.get("/", getPosts);

// Delete a post
router.delete("/:id", deletePost);

// Update a post
router.put("/:id", updatePost);

module.exports = router;
