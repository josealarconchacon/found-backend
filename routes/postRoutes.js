const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} = require("../controllers/postController");

// routes
router.post("/", createPost); // POST route for creating posts
router.get("/", getPosts); // GET route for getting posts
router.delete("/:id", deletePost); // DELETE route for deleting posts
router.put("/:id", updatePost); // PUT route for updating posts

module.exports = router;
