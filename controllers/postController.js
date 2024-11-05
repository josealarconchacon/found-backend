const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = new Post({ userId: req.user.id, ...req.body });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
