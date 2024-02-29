
const LikesModel = require("./likes.model");

class LikesController {
  async addLike(req, res) {
    try {
      const { postId, userId } = req.body;

      // Create and save a new like
      const newLike = new LikesModel({ postId, userId });
      await newLike.save();

      res.json({
        result:newLike,
        message: 'Like added successfully',
        meta:null
    })
    } catch (error) {
      next(error);
    }
  }

  async removeLike(req, res) {
    try {
      const { postId } = req.params;

      // Remove the like based on postId
      await LikesModel.deleteOne({ postId });

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

  async getLikesForPost(req, res) {
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
}

const likesCtrl = new LikesController();
module.exports = likesCtrl;
