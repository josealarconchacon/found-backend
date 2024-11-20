const Post = require("../models/Post");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    // Respond with the posts as a JSON array
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { description, location, category } = req.body;

  // Validate input
  if (!description || !location || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newPost = new Post({
      description,
      whereItWasFound: location,
      category,
    });

    // Save to the database
    const savedPost = await newPost.save();

    // Respond with the saved post
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

exports.updatePost = (req, res) => {
  res.send("Update post");
};

exports.deletePost = (req, res) => {
  res.send("Delete post");
};

exports.likePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Remove like if already liked
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // Add like
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      message: isLiked ? "Post unliked" : "Post liked",
      likes: post.likes.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error liking post", error: error.message });
  }
};
