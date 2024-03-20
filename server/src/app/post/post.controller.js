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
    updatePost = async (req, res, next) => {
        try {
            const postId = req.params.postId; 
            const payload = new PostRequest(req).transformRequestData();

            // Call the service function to update the post
            const updatedPost = await postSvc.updatePost(postId, payload);

            res.json({
                result: updatedPost,
                message: "Post updated successfully!",
                meta: null
            });
        } catch (error) {
            next(error);
        }
    };
    deletePost = async (req, res, next) => {
        try {
            const postId = req.params.postId;

            // Call the service function to delete the post
            await postSvc.deletePost(postId);

            res.json({
                message: "Post deleted successfully!",
                meta: null
            });
        } catch (error) {
            next(error);
        }
    };

    getFeedPosts = async(req, res, next) => {
        try {
            const page = req.query['page'] || 1;
            const limit = req.query['limit'] || 10;
            const searchKeyword = req.query['search'];
    
            // Call the service function with pagination and search parameters
            const allPosts = await postSvc.getFeedPosts(page, limit, searchKeyword);
    
            res.json({
                result: allPosts?.posts,
                message: "Successfully fetched all posts!",
                meta: {
                    total:allPosts?.totalCount,
                    currentPage: page,
                    limit: limit
                }
            });
        } catch (error) {
            next(error);
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


    // likePost = async(req,res,next)=>{
    //     try {
    //         const updatedPost = await postSvc.likePost(req);

    //         res.json({
    //             result:{updatedPost},
    //             message:"Successful like/unlike!",
    //             meta:null
    //         });
            
    //     } catch (error) {
    //         next(error)            
    //     }
    // }
}


const postCtrl = new PostController();
module.exports = postCtrl;