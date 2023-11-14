const UserModel = require("../user/user.model");

class AuthServices{

    registerUser = async (payload) =>{
        try {
            const newUser = new UserModel(payload);
            const registeredUser = await newUser.save();

            return registeredUser;
        } catch (error) {
            throw(error);            
        }
    }


    getUserByFilter = async (filter)=>{
        try {
            const userDetails = await UserModel.findOne(filter);
            return userDetails;
        } catch (error) {
            throw(error);            
        }
    }
}

const authSvc = new AuthServices();
module.exports = authSvc;