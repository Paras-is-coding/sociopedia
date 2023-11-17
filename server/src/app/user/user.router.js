const checkLogin = require('../../middlewares/auth.middleware');
const userCtrl = require('./user.controller');

const userRouter = require('express').Router();

// read
userRouter.get('/:id',checkLogin,userCtrl.getUser);
userRouter.get('/:id/friends',checkLogin,userCtrl.getUserFriends);

// update
userRouter.patch('/:id/:friendId',checkLogin,userCtrl.addRemoveFriend);

module.exports = userRouter;