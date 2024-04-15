
const notificationsCtrl = require("../notification/notification.controller");
const PostModel = require("../post/post.model");
const userSvc = require("../user/user.services");
const CommentsModel = require("./comments.model");

class CommentsController {
  async addComment(req, res,next) {
    try {
      const { postId, userId ,text} = req.body;
      const userDetails = await userSvc.getUserByFilter({_id:userId});


      // Create and save a new comment
      const newComment = new CommentsModel({ 
        postId, 
        userId ,
        text,
        firstname:userDetails.firstname,
        lastname:userDetails.lastname,
        userPicturePath:userDetails.picturePath,

      });
     
      await newComment.save();


      // Notify the creator of the post about the new comment
      const post = await PostModel.findById(postId);
      await notificationsCtrl.createNotification(
        post.user, 
        userId, 
        'comment',
        postId
      );


      res.json({
        result:newComment,
        message: 'Comment added successfully',
        meta:null
    })
    } catch (error) {
      next(error);
    }
  }

  async removeComment(req, res,next) {
    try {
      const {commentId} = req.params;

      // Remove the comment based on postId
      await CommentsModel.deleteOne({_id:commentId });

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

  async getCommentsForPost(req, res,next) {
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


  async editComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const { text } = req.body;

      // Find the comment by ID
      const comment = await CommentsModel.findById(commentId);

      if (!comment) {
        return res.status(404).json({
          message: "Comment not found",
        });
      }

      // Update the comment text
      comment.text = text;

      // Save the updated comment
      await comment.save();

      res.json({
        result: comment,
        message: "Comment updated successfully",
        meta: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

const commentsCtrl = new CommentsController();
module.exports = commentsCtrl;
