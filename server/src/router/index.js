const router = require('express').Router();

const authRouter = require('../app/auth/auth.router.js');
const userRouter = require('../app/user/user.router.js');



router.use('/auth',authRouter);
router.use('/user',userRouter);

module.exports = router;