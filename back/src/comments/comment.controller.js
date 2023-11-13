const commentService = require("./comment.service");

exports.getAllComments = async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.json(comments);
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.addComment = async (req, res) => {
  const { content, userid, date } = req.body;
  try {
    const newComment = await commentService.addComment(content, userid, date);
    res.json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateComment = async (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;
  try {
    const updatedComment = await commentService.updateComment(id, content);
    if (updatedComment) {
      res.json({
        success: true,
        message: "Comment updated successfully",
        comment: updatedComment,
      });
    } else {
      res.status(404).json({ success: false, message: "Comment not found" });
    }
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteComment = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedComment = await commentService.deleteComment(id);
    if (deletedComment) {
      res.json({ success: true, message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Comment not found" });
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
