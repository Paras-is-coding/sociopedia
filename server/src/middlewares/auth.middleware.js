const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getTokenFromHeader } = require('../config/helper');
const authSvc = require('../app/auth/auth.services');


const checkLogin = async (req, res, next) => {
    try {
      // token verify here
      let token = getTokenFromHeader(req);
  
      // token => null / "Bearer token" / "token"
      if (token === null) {
        next({ code: 401, message: "Login required!" });
      } else {
        // token => "Bearer token" / "token"
        // "Bearer token" = ["Bearer","token"]
        // "token" = ["token"]
        token = token.split(" ").pop();
        if (!token) {
          // token => "Bearer "
          next({ code: 401, message: "Token required!" });
        } else {
  
          // TODO: DB check for token and verify
          let patData = await authSvc.getPatByToken(token);
          if (patData) {
            // token = "token"
            let data = jwt.verify(token, process.env.JWT_SECRET_KEY);
            //data yo hunxa {userId:"",iat:"",exp:""}
            //TODO verify payload > here userId is payload in return of data
            let userDetail = await authSvc.getUserByFilter({
              _id: data.userId,
            });
  
            if (userDetail) {
              let {password,...rest} = userDetail?._doc;
              req.authUser = rest; // sometimes in next midd. we may need this data
              next();
            } else {
              next({ code: 401, message: "User does not exist anymore" });
            }
          } else {
            next({ code: 401, message: "Token already expired or invalid!" });
          }
        }
      }
    } catch (except) {
      console.log(except);
      next({
        code: 401,
        message: "Authentication failed!",
        result: except.message,
      });
    }
  };
  
  module.exports = checkLogin;