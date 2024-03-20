const userSvc = require("../user/user.services.js");
const PostModel = require("./post.model.js");
class PostServices {
  createNewPost = async (payload) => {
    const { user, caption, picturePath } = payload;
    const userDetails = await userSvc.getUserByFilter({ _id: user });

    const newPost = new PostModel({
      user,
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      location: userDetails.location,
      caption,
      picturePath,
      userPicturePath: userDetails.picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    // getting all posts
    const allPosts = await PostModel.find();
    return { newPost, allPosts };
  };

  getFeedPosts = async (page = 1, limit = 10, searchKeyword = "") => {
    try {
      // Apply pagination
      const skip = (page - 1) * limit;

      // Construct filter based on searchKeyword
      let filter = {};
      if (searchKeyword) {
        filter = {
          $or: [
            { caption: new RegExp(searchKeyword, "i") },
            { firstname: new RegExp(searchKeyword, "i") },
            { lastname: new RegExp(searchKeyword, "i") },
            { location: new RegExp(searchKeyword, "i") },
          ],
        };
      }

      // Fetch posts with pagination and search
      const posts = await PostModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      // Fetch total count of posts
      const totalCount = await PostModel.countDocuments(filter);

      return { posts, totalCount };
    } catch (error) {
      throw error;
    }
  };

  getUserPosts = async (req) => {
    const { userId } = req.params;

    const userPosts = await PostModel.find({ user: userId });
    return userPosts;
  };

  updatePost = async (postId, payload) => {
    const { caption, location, picturePath } = payload;
    const post = await PostModel.findById(postId);

    // Check if the post exists
    if (!post) {
      throw new Error("Post not found");
    }

    // Update the fields in the post object
    post.caption = caption || post.caption;
    post.location = location || post.location;

    // If picturePath is provided, update it
    if (picturePath) {
      post.picturePath = picturePath;
    }

    // Save the updated post
    const updatedPost = await post.save();

    return updatedPost;
  };

  deletePost = async (postId) => {
    try {
      // Find the post by its ID
      const post = await PostModel.findById(postId);

      // Check if the post exists
      if (!post) {
        throw new Error("Post not found");
      }

      // Delete the post
      await PostModel.findByIdAndDelete(postId);
    } catch (error) {
      throw error;
    }
  };

  // likePost = async (req)=>{
  //     const {id} = req.params;
  //     const {userId} = req.body;

  //     const post = await PostModel.findById(id);
  //     const isLiked = post.likes.get(userId);

  //     if(isLiked){
  //         post.likes.delete(userId);
  //     }else{
  //         post.likes.set(userId,true);
  //     }

  //     const updatedPost = await PostModel.findByIdAndUpdate(id,{likes:post.likes},{new:true});
  //     return updatedPost;
  // }
}

const postSvc = new PostServices();
module.exports = postSvc;
