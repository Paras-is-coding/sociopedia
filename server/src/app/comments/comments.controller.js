
const CommentsModel = require("./comments.model");

class CommentsController {
  async addComment(req, res) {
    try {
      const { postId, userId } = req.body;

      // Create and save a new comment
      const newComment = new CommentsModel({ postId, userId });
      await newComment.save();

      res.json({
        result:newComment,
        message: 'Comment added successfully',
        meta:null
    })
    } catch (error) {
      next(error);
    }
  }

  async removeComment(req, res) {
    try {
      const { postId } = req.params;

      // Remove the comment based on postId
      await CommentsModel.deleteOne({ postId });

      res.json({
        result:{
            success:true
        },
        message: 'Comment removed successfully',
        meta:null
    })
    } catch (error) {
      next(error);
    }
  }

  async getCommentsForPost(req, res) {
    try {
      const { postId } = req.params;

      // Find comments for the specified postId
      const comments = await CommentsModel.find({ postId });

      // Send the comments as a response
      res.json({
        result:comments,
        message: 'Comments fetched successfully',
        meta:null
    })
    } catch (error) {
      next(error);
    }
  }
}

const commentsCtrl = new CommentsController();
module.exports = commentsCtrl;
