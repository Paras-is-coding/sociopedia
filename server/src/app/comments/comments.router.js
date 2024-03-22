const express = require('express');
const commentsController = require('./comments.controller');
const checkLogin = require('../../middlewares/auth.middleware');
const { commentSchema } = require('./comments.validator');
const ValidateRequest = require('../../middlewares/validate-request.middleware');
const commentsRouter = express.Router();

// Define routes for comments
commentsRouter.post('/comment',checkLogin,ValidateRequest(commentSchema), commentsController.addComment);
commentsRouter.delete('/uncomment/:commentId',checkLogin, commentsController.removeComment);
commentsRouter.get('/post/:postId', commentsController.getCommentsForPost);


commentsRouter.patch('/comment/:commentId', checkLogin, ValidateRequest(commentSchema), commentsController.editComment);

module.exports = commentsRouter;
