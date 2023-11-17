const UserModel = require("./user.model");

class UserServices{

    getUserByFilter = async (filter)=>{
        try {
            const userDetails = await UserModel.findOne(filter);
            return userDetails;
        } catch (error) {
            throw error;            
        }
    }

    updateUser = async (filter,data)=>{
        try {
            let response = await UserModel.updateOne(filter,{
                $set:data
            })
            return response;
        } catch (except) {
            throw except;            
        }
    }
}

const userSvc = new UserServices();
module.exports = userSvc;