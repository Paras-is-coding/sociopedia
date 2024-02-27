const authCtrl = require('./auth.controller');
const uploader = require('../../middlewares/uploader.middleware');
const checkLogin = require('../../middlewares/auth.middleware');
const { passwordSchema, loginSchema, regSchema, forgetPasswordSchema } = require('./auth.validator');

const authRouter = require('express').Router();

// setup for picture upload path
const dirSetup = (req,res,next)=>{
    const uploadDir = './public/uploads/user';
    req.uploadDir = uploadDir;
    next();
}
authRouter.post('/register',dirSetup,uploader.single('picture'),ValidateRequest(regSchema),authCtrl.register);

authRouter.get('/verify-token/:token',authCtrl.verifyToken)

authRouter.post("/set-password/:token",ValidateRequest(passwordSchema),authCtrl.setPassword)


authRouter.post('/login',ValidateRequest(loginSchema),authCtrl.login);

authRouter.post('/logout',checkLogin, authCtrl.logoutUser)

authRouter.get('/me',checkLogin,authCtrl.getLoggedInUser)


authRouter.post("/refresh-token",checkLogin, authCtrl.refreshToken)


authRouter.post('/forget-password',ValidateRequest(forgetPasswordSchema),authCtrl.forgetPassword)
authRouter.post('/reset-password/:resetToken',authCtrl.resetPassword)

module.exports = authRouter;






  







