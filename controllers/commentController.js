const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.createComment = async (req, res) => {
  const { postId, userId, content } = req.body;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const newComment = new Comment({
      postId,
      userId,
      content,
    });
    const savedComment = await newComment.save();
    // Add comment to post's comments array
    post.comments.push(savedComment._id);
    await post.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating comment", error: error.message });
  }
};

exports.likeComment = async (req, res) => {
  const { commentId, userId } = req.body;
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const isLiked = comment.likes.includes(userId);
    if (isLiked) {
      // Remove like if already liked
      comment.likes = comment.likes.filter((id) => id.toString() !== userId);
    } else {
      // Add like
      comment.likes.push(userId);
    }
    await comment.save();
    res.status(200).json({
      message: isLiked ? "Comment unliked" : "Comment liked",
      likes: comment.likes.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error liking comment", error: error.message });
  }
};
