const AuthRequest = require("./auth.request");
const bcrypt = require('bcrypt')

const authSvc = require("./auth.services");
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController{
    register = async (req,res,next) =>{
        try {
            
        const payload = new AuthRequest(req).transformRequestData();

        const savedUser = await authSvc.registerUser(payload);
        
        const{password,...rest} = savedUser;
        res.json({
            result:rest,
            messsage:"User registered successfully!",
            meta:null
        }) 
        } catch (error) {
            next(error);
        }
    }



    login = async (req,res,next) =>{
        try {
            const {email,password} = req.body;

            const userDetails = await authSvc.getUserByFilter({email:email});
            
            if(userDetails){
                if(bcrypt.compareSync(password,userDetails.password)){
                    // user is logged in 
                    // create JWT 
                    
                    let token = jwt.sign(
                        {userId:userDetails._id},
                        process.env.JWT_SECRET_KEY,
                        {expiresIn:"1d"}
                    );

                    res.json({
                        result:{
                            token:token,
                            type:"Bearer"
                        },
                        message:"User loggedIn successfully!",
                        meta:null
                    })
                }else{
                    next({code:400,message:"Crediantials does not match!"})
                }
            }else{
                next({code:400,message:"User doesnot exist!"})
            }

        } catch (error) {
            next(error)            
        }
    }

}


const authCtrl = new AuthController();
module.exports = authCtrl;  