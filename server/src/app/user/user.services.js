const PATModel = require("../auth/personal-access-token");
const CommentModel = require("../comments/comments.model");
const LikesModel = require("../likes/likes.model");
const NotificationModel = require("../notification/notification.model");
const PostModel = require("../post/post.model");
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


    getAllUsers = async (searchKeyword = "") => {
        try {
          // Construct filter based on searchKeyword if provided
          let filter = {};
          if (searchKeyword) {
            filter = {
              $or: [
                { firstname: new RegExp(searchKeyword, "i") },
                { lastname: new RegExp(searchKeyword, "i") },
                { location: new RegExp(searchKeyword, "i") },
                // Add more fields to search as needed
              ],
            };
          }
      
          // Query users based on filter (or fetch all users if no filter is provided)
          const users = await UserModel.find(filter);
      
          return users;
        } catch (error) {
          throw error;
        }
      };



      deleteUserById = async (id) => {
        try {
          const deletedUser = await UserModel.findByIdAndDelete(id);


          // associated data of user 
          await PostModel.deleteMany({ user: id });
          await PATModel.deleteMany({ userId: id });
          await NotificationModel.deleteMany({ recipient: id });
          await LikesModel.deleteMany({ userId: id });
          await CommentModel.deleteMany({ userId: id });



          return deletedUser;
        } catch (error) {
          throw error;
        }
      };
}

const userSvc = new UserServices();
module.exports = userSvc;