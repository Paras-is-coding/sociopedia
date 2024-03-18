
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
}

const commentsCtrl = new CommentsController();
module.exports = commentsCtrl;
