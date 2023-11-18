const checkLogin = require('../../middlewares/auth.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const postCtrl = require('./post.controller');

const postRouter = require('express').Router();

// create
postRouter.post("/",checkLogin,uploader.single("picture"),postCtrl.createPost)

// read
postRouter.get("/",checkLogin,postCtrl.getFeedPosts)
postRouter.get("/:userId",checkLogin,postCtrl.getUserPosts)

// update
postRouter.patch("/like/:id",checkLogin,postCtrl.likePost)


module.exports = postRouter;
