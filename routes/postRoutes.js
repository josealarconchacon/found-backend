
const express = require("express");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getPosts); // GET /api/posts
router.post("/", createPost); // POST /api/posts
router.put("/:id", updatePost); // PUT /api/posts/:id
router.delete("/:id", deletePost); // DELETE /api/posts/:id

module.exports = router;
