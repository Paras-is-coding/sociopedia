const userSvc = require('../user/user.services.js');
const PostModel = require('./post.model.js');
class PostServices{
    createNewPost = async (payload) =>{
        const {userId,description,picturePath} = payload;
        const userDetails = await userSvc.getUserByFilter({_id:userId});

        const newPost = new PostModel({
            userId,
            firstname:userDetails.firstname,
            lastname:userDetails.lastname,
            location:userDetails.location,
            description,
            picturePath,
            userPicturePath:userDetails.picture,
            likes:{},
            comments:[]
        });

        await newPost.save();

        // getting all posts
        const allPosts = await PostModel.find();
        return {newPost,allPosts};

    }

    getFeedPosts = async () =>{
        const allPosts = await PostModel.find();
        return allPosts;
    }

    getUserPosts = async (req) =>{
        const {userId} = req.params;

        const userPosts = await PostModel.find({userId:userId});
        return userPosts;
    }

}

const postSvc = new PostServices();
module.exports = postSvc;