const checkLogin = require('../../middlewares/auth.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const ValidateRequest = require('../../middlewares/validate-request.middleware');
const postCtrl = require('./post.controller');
const { postSchema } = require('./post.validator');

const postRouter = require('express').Router();

// setup for picture upload path
const dirSetup = (req,res,next)=>{
    const uploadDir = './public/uploads/posts';
    req.uploadDir = uploadDir;
    next();
}

// create
postRouter.post("/",checkLogin,dirSetup,uploader.single("picture"),ValidateRequest(postSchema),postCtrl.createPost)


// read
postRouter.get("/",checkLogin,postCtrl.getFeedPosts)
postRouter.get("/:userId",checkLogin,postCtrl.getUserPosts)

// // update
// postRouter.patch("/like/:id",checkLogin,postCtrl.likePost)


module.exports = postRouter;
