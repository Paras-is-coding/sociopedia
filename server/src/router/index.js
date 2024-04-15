const router = require('express').Router();

const authRouter = require('../app/auth/auth.router.js');
const commentsRouter = require('../app/comments/comments.router.js');
const ImageRouter = require('../app/images/images.router.js');
const likesRouter = require('../app/likes/likes.router.js');
const messageRouter = require('../app/message/message.router.js');
const notificationsRouter = require('../app/notification/notification.router.js');
const postRouter = require('../app/post/post.router.js');
const userRouter = require('../app/user/user.router.js');



router.use('/auth',authRouter);
router.use('/user',userRouter);
router.use('/posts',postRouter);
router.use('/message',messageRouter);

router.use('/comments',commentsRouter);
router.use('/likes',likesRouter);
router.use('/notifications',notificationsRouter);

router.use('/images',ImageRouter);

module.exports = router;