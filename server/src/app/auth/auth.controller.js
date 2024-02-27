const AuthRequest = require("./auth.request");
const bcrypt = require("bcrypt");

const authSvc = require("./auth.services");
const jwt = require("jsonwebtoken");
const { getTokenFromHeader, generateRandomString } = require("../../config/helper");
const mailSvc = require("../services/mail.service");
require("dotenv").config();

class AuthController {
  register = async (req, res, next) => {
    try {
      const payload = new AuthRequest(req).transformRequestData();

      const savedUser = await authSvc.registerUser(payload);


      const mailMsg = authSvc.registerEmailMessage(payload.firstname, payload.token);
      await mailSvc.emailSend(payload.email, "Activate your account!", mailMsg);

      res.json({
        result: savedUser,
        messsage: "User registered successfully!",
        meta: null,
      });
    } catch (error) {
      next(error);
    }
  };

  verifyToken = async (req, res, next) => {
    try {
      let token = req.params.token;

      // DB query to validate token
      const userdetails = await authSvc.getUserByFilter({ token: token });

      // response to make sure user is registered
      if (userdetails) {
        res.json({
          result: userdetails,
          message: "Valid token!",
          meta: null,
        });
      } else {
        next({ code: 400, message: "Invalid or Expired token" });
      }
    } catch (except) {
      next(except);
    }
  };

  setPassword = async (req, res, next) => {
    try {
      let data = req.body;
      console.log(data);

      let token = req.params.token;

      // check of user is registered through token
      const userdetails = await authSvc.getUserByFilter({ token: token });

      if (userdetails) {
        let encPass = bcrypt.hashSync(data.password, 10);
        const updateData = {
          password: encPass,
          token: null,
          status: "active",
        };

        let updateResponse = await authSvc.updateUser(
          { _id: userdetails._id },
          updateData
        );

        // after updation of encripted psw, token and active status send response
        res.json({
          result: updateResponse,
          message: "User Activated Successfully!",
          meta: null,
        });
      } else {
        next({
          code: 400,
          message: "Invalid token/expired token/broken",
          result: data,
        });
      }
    } catch (except) {
      next(except);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // fetch user from db through email of exist
      const userDetails = await authSvc.getUserByFilter({ email: email });

      if (userDetails) {
        if (userDetails.token === null && userDetails.status === "active") {
          if (bcrypt.compareSync(password, userDetails.password)) {
            // user is logged in
            // create JWT token and refresh token
            let token = jwt.sign(
              { userId: userDetails._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1d" }
            );
            let refreshToken = jwt.sign(
              { userId: userDetails._id },
              process.env.JWT_SECRETKEY,
              { expiresIn: "1d" }
            );

            // TODO : Store loggedin token in seperate DB table
            let patData = {
              userId: userDetails._id,
              token: token,
              refreshToken: refreshToken,
            };
            await authSvc.storePAT(patData);

            res.json({
              token: token,
              refreshToken: refreshToken,
              type: "Bearer", // just to identify token
            });
          } else {
            next({ code: 400, message: "Credential doesnot match!" });
          }
        } else {
          next({
            code: 401,
            message: "User not activated. Check email for activation!",
          });
        }
      } else {
        next({ code: 400, message: "User does not exist!" });
      }
    } catch (error) {
      next(error);
    }
  };


  getLoggedInUser = (req, res, next) => {
    res.json({ authUser: req.authUser });
  };


  logoutUser = async (req, res, next) => {
    try {
      let token = getTokenFromHeader(req);
      //TODO: complete logout
      let loggedout = await authSvc.deletePatData(token);
      res.json({
        result: null,
        message: "Logged out successfully!",
        meta: null
      })
    } catch (error) {
      next(error)
    }
  };




  refreshToken = async (req,res,next)=>{
    try {
      
          // Create JWT
          let newToken = jwt.sign(
            { userId: req.authUser._id },
            process.env.JWT_SECRETKEY,
            { expiresIn: "2d" }
          );

          // update the user's token
          await authSvc.updateUser({_id:req.authUser._id},{token:newToken})
         

          // Store newToken in database pats table
          const patUser = await authSvc.getPatById(req.authUser._id);
          let patData = {
            userId: req.authUser._id,
            token: newToken,
            refreshToken: patUser.refreshToken
            
          }
          await authSvc.storePAT(patData);


          // respond with the new token and relevant info
          res.json({
            token: newToken,
            refreshToken: patUser.refreshToken,
            type: "Bearer", // just to identify token
          }); 
    } catch (error) {
      next(error)
      
    } 
  };


  forgetPassword = async (req, res, next) => {
    try {

      // Fetch userDetails using email from DB
      let userDetail = await authSvc.getUserByFilter({
        email: req.body.email,
      });

      if (userDetail.status === 'active') {

        // resetToken and resetExpiry to userDetails
        let resetToken = generateRandomString();
        let resetExpiry = Date.now() + 86400000;
        let updateData = {
          resetToken,
          resetExpiry
        }
        let response = await authSvc.updateUser({ email: req.body.email }, updateData);

        // Send resetToken to mail we received
        let mailMsg = authSvc.forgotPasswordMessage("User", resetToken);
        const mailAck = await mailSvc.emailSend(
          req.body.email,
          "Activate your account!",
          mailMsg
        );
        console.log(mailAck);

        // response 
        res.json({
          result: null,
          message: "Check your email to confirm your email!",
          meta: null,
        });

      } else {
        next({ code: 400, message: "User is not activated!" })
      }

    } catch (error) {
      next(error)

    }

  };



  resetPassword = async (req, res, next) => {
    try {


      let resetToken = req.params.resetToken;
      let password = req.body.password;

      // fetch user using resetToken DB, check exists & expired
      let userDetails = await authSvc.getUserByFilter({ resetToken })


      if (!userDetails) {
        throw ({ code: 400, message: "Invalid token!" })
      } else {
        // DB resetExpiry, string format -> 2023-10-13T09:00:00:000(Z if UTC is set)
        let date = userDetails.resetExpiry;
        // so extract timestamp = new Date(userDetails.resetEspiry).getTime(); 
        let timestamp = new Date(date).getTime();
        // todaysTime = Date.now();
        let todaysTime = Date.now();

        if (todaysTime > timestamp) {
          throw { code: 400, message: "Token Expired" }
        } else {
          const updateData = {
            password: bcrypt.hashSync(password, 10),
            resetToken: null,
            resetExpiry: null
          }

          let response = await authSvc.updateUser({
            resetToken
          }, updateData);

          // success response send
          res.json({
            result: null,
            message: "Password reset successfully. Login to continue!",
            meta: null
          });

        }
      }


    } catch (error) {
      next(error)

    }

  };





}

const authCtrl = new AuthController();
module.exports = authCtrl;
