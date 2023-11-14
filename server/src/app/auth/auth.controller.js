const AuthRequest = require("./auth.request");
const authSvc = require("./auth.services");


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

}


const authCtrl = new AuthController();
module.exports = authCtrl;  