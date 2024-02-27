const checkLogin = require('../../middlewares/auth.middleware');
const userCtrl = require('./user.controller');

const userRouter = require('express').Router();

// read
userRouter.get('/:id',checkLogin,userCtrl.getUser);
userRouter.get('/:id/followers',checkLogin,userCtrl.getUserFollowers);
userRouter.get('/:id/following',checkLogin,userCtrl.getUserFollowing);

// update
userRouter.patch('/:id/:followingId',checkLogin,userCtrl.addRemoveFollowing);

module.exports = userRouter;