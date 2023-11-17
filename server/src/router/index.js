const router = require('express').Router();

const authRouter = require('../app/auth/auth.router.js');
const postRouter = require('../app/post/post.router.js');
const userRouter = require('../app/user/user.router.js');



router.use('/auth',authRouter);
router.use('/user',userRouter);
router.use('/posts',postRouter);

module.exports = router;