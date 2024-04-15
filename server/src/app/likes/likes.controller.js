
const notificationsCtrl = require("../notification/notification.controller");
const PostModel = require("../post/post.model");
const LikesModel = require("./likes.model");

class LikesController {
  async addLike(req, res,next) {
    try {
      const { postId, userId } = req.body;

      // Create and save a new like
      const newLike = new LikesModel({ postId, userId });
      await newLike.save();

       // Notify the author of the post about the like
       const post = await PostModel.findById(postId);
       await notificationsCtrl.createNotification(
         post.user, 
         userId, 
         'like', 
         postId 
       );

      res.json({
        result:newLike,
        message: 'Like added successfully',
        meta:null
    })
    } catch (error) {
      next(error);
    }
  }

  async removeLike(req, res,next) {
    try {
      const { postId} = req.params;
      const {userId} = req.query;
      console.log("p"+postId+" u"+userId)

      // Remove the like based on postId
      await LikesModel.deleteOne({ postId,userId });

      res.json({
        result:{
            success:true
        },
        message: 'Like removed successfully',
        meta:null
    })
    } catch (error) {
      next(error);
    }
  }

  async getLikesForPost(req, res,next) {
    try {
      const { postId } = req.params;

      // Find likes for the specified postId
      const likes = await LikesModel.find({ postId });

      // Send the likes as a response
      res.json({
        result:likes,
        message: 'Likes fetched successfully',
        meta:null
    })
    } catch (error) {
      next(error);
    }
  }
  async isLikedByUser(req, res,next) {
    try {
      const { postId}= req.params;
      const { userId}= req.query;

      // Find likes for the specified postId
      const isLiked = await LikesModel.exists({ postId,userId });

      res.json({
        result: isLiked,
        message: isLiked ? 'User has liked the post' : 'User has not liked the post',
        meta: null
      });
    } catch (error) {
      next(error);
    }
  }
}

const likesCtrl = new LikesController();
module.exports = likesCtrl;
