const authCtrl = require('./auth.controller');
const uploader = require('../../middlewares/uploader.middleware');
const checkLogin = require('../../middlewares/auth.middleware');

const authRouter = require('express').Router();

// setup for picture upload path
const dirSetup = (req,res,next)=>{
    const uploadDir = './public/uploads/user';
    req.uploadDir = uploadDir;
    next();
}
authRouter.post('/register',dirSetup,uploader.single('picture'),authCtrl.register);
authRouter.post('/login',authCtrl.login);

// test route
authRouter.post('/me',checkLogin,(req,res,next)=>{res.json({msg:"Hey its you, authorized person!"})});

module.exports = authRouter;