const UserModel = require("../user/user.model");
const PATModel = require("./personal-access-token");

class AuthServices {

  registerEmailMessage(name, token) {
    // TODO: DB table msg
    return `
                <b>Dear ${name}</b><br/>
                <p>Your account has been successfully registerd. Please copy or click the link below to activate your account: </p>
                <a href="${process.env.FRONTEND_URL}/activate/${token}">
                    ${process.env.FRONTEND_URL}/activate/${token}
                </a><br/>
                <p>
                    <b>Regards</b>
                </p>
                <p>
                    <b>System Admin</b>
                </p>
                <p>
                    <em><small>Please do not reply to this email.</small></em>
                </p>
            `
}

forgotPasswordMessage(name,token){
    //TODO:Db table msg
    return`
    <b>Dear ${name}</b><br/>
    <p>Click the link below to reset password.</p>
    <a href="${process.env.FRONTEND_URL}/set-password/${token}">
    ${process.env.FRONTEND_URL}/set-password/${token}
    </a><br/>
    <p>
        <b>Regards</b>
    </p>
    <p>
        <b>System Admin</b>
    </p>
    <p>
        <em><small>Please do not reply to this email</small></em>
    </p>`
}




  registerUser = async (payload) => {
    try {
      const newUser = new UserModel(payload);
      const registeredUser = await newUser.save();

      return registeredUser;
    } catch (error) {
      throw error;
    }
  };

  getUserByFilter = async (filter) => {
    try {
      const userDetails = await UserModel.findOne(filter);
      return userDetails;
    } catch (error) {
      throw error;
    }
  };


  storePAT = async (data) => {
    try {
      let patObj = new PATModel(data);
      return await patObj.save();
    } catch (error) {
      throw error;
    }
  };
  
  getPatByToken = async (token) => {
    try {
      let patData = await PATModel.findOne({
        $or: [{ token: token }, { refreshToken: token }],
      });
      return patData;
    } catch (error) {
      throw error;
    }
  };
  
  getPatById = async (id) => {
    try {
      let patData = await PATModel.findOne({
        userId: id,
      });
      return patData;
    } catch (error) {
      throw error;
    }
  };
  
  deletePatData = async (token) => {
    try {
      // also have other functions to delete
      let deleted = await PATModel.findOneAndDelete({
        token: token,
      });
      if (deleted) {
        return deleted;
      } else {
        throw { code: 404, message: "Token does not exists" };
      }
    } catch (error) {
      throw error;
    }
  };
  
  updateUser = async (filter, data) => {
    try {
      let response = await UserModel.updateOne(filter, {
        $set: data,
      });
      return response;
    } catch (except) {
      throw except;
    }
  };


}






const authSvc = new AuthServices();
module.exports = authSvc;
