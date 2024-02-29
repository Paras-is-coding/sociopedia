const express = require('express');
const likesController = require('./likes.controller');
const checkLogin = require('../../middlewares/auth.middleware');
const { likeSchema } = require('./likes.validator');
const ValidateRequest = require('../../middlewares/validate-request.middleware');
const likesRouter = express.Router();

// Define routes for likes
likesRouter.post('/like',checkLogin,ValidateRequest(likeSchema), likesController.addLike);
likesRouter.delete('/unlike/:postId', likesController.removeLike);
likesRouter.get('/post/:postId', likesController.getLikesForPost);

module.exports = likesRouter;
