const PostRequest = require("./post.request");
const postSvc = require("./post.services")

class PostController{

    createPost = async(req,res,next)=>{
        try {
            const payload = new PostRequest(req).transformRequestData();

            // returns newPost and allPosts
            const newPostres = await postSvc.createNewPost(payload);

            res.json({
                result:newPostres,
                message:"Post created successfully!",
                meta:null
            })
            
        } catch (error) {
            next(error)            
        }
    }
    getFeedPosts = async(req,res,next)=>{
        try {
            const allPosts = await postSvc.getFeedPosts();
            res.json({
                result:{allPosts},
                message:"Successfully fetched all posts!",
                meta:null
            })
        } catch (error) {
            next(error)            
        }
    }
    getUserPosts = async(req,res,next)=>{
        try {
            const userPosts = await postSvc.getUserPosts(req);
            res.json({
                result:{userPosts},
                message:"Successfully fetched user posts!",
                meta:null
            })            
        } catch (error) {
            next(error)            
        }
    }


    likePost = async(req,res,next)=>{
        try {
            const updatedPost = await postSvc.likePost(req);

            res.json({
                result:{updatedPost},
                message:"Successful like/unlike!",
                meta:null
            });
            
        } catch (error) {
            next(error)            
        }
    }
}


const postCtrl = new PostController();
module.exports = postCtrl;