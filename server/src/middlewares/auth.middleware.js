const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getTokenFromHeader } = require('../config/helper');
const authSvc = require('../app/auth/auth.services');



const checkLogin = async (req,res,next) =>{
try {
    
    let token = getTokenFromHeader(req);
    // token = "Bearer token" | "Bearer " | "token" | null
    if(token === null){
        next({code:401,message:"Login required!"});
    }else{
        token = token.split(" ").pop();
        if(!token){
            next({code:401,message:"Token required!"})
        }else{

            // verify token
            // returns decoded jwt OR error
            let data = jwt.verify(token,process.env.JWT_SECRET_KEY);

            // verify user of token
            // we can append the logged in userDetails to req as authUser
            let userDetails = await authSvc.getUserByFilter({_id:data.userId});

            if(userDetails){
                req.authUser = userDetails
                next();
            }else{
                next({code:401,message:"User doesnot exist anymore!"});
            }

        }
    }
} catch (error) {
    next({
        code:401,
        message:"Authorization failed!",
        result:error.message
    })  
}
}



module.exports = checkLogin;