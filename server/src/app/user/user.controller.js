const notificationsCtrl = require("../notification/notification.controller");
const userSvc = require("./user.services");
const { ObjectId } = require('mongodb');

class UserController{
    editProfile = async(req,res,next)=>{
        try {
            const {id} = req.params;
            const userDetails = await userSvc.getUserByFilter({_id:id});
            if(!userDetails){
                return next({code:400,message:"User not found!"});
            }

             // Extract relevant data from the request body
    const { firstName, lastName, bio, occupation, location, phone } = req.body;

    // Update user details
    const updatedUser = await userSvc.updateUser({_id:id}, {
        firstName,
        lastName,
        picturePath:req?.file?.filename,
        bio,
        occupation,
        location,
        phone,
      });

      res.json({
        result:{
            user:updatedUser
        },
        message:"Profile edited successfully!",
        meta:null
      })

            
        } catch (error) {
            next(error);            
        }
    }
    getUser = async (req,res,next)=>{
        try {
            const {id} = req.params;
            const userDetails = await userSvc.getUserByFilter({_id:id});
            delete userDetails._doc.password;
            if(userDetails){
                res.json({
                    result:{
                        user:userDetails
                    },
                    message:"User found successfully!",
                    meta:null
                })
            }
            else{
                next({code:400,message:"User not found!"});
            }
        } catch (error) {
            next(error);            
        }
    }


    getAllUsers = async (req, res, next) => {
        try {
          const searchKeyword = req.query['search'];
      
          // Call the service function with search parameter
          const allUsers = await userSvc.getAllUsers(searchKeyword);
      
          res.json({
            result: allUsers,
            message: "Successfully fetched all users!",
            meta:null
          });
        } catch (error) {
          next(error);
        }
      };

    getUserFollowers = async (req,res,next)=>{
        try {
            const {id} = req.params;
            const userDetails = await userSvc.getUserByFilter({_id:id});

            if(userDetails.followers.length > 0){
              const followers = await Promise.all(
                userDetails.followers.map((id)=>{
                        return userSvc.getUserByFilter({_id:id});
                })
              );

                const formattedFollowers = followers.map(({_id,firstname,lastname,occupation,location,picturePath})=>{
                    return {_id,firstname,lastname,occupation,location,picturePath};
                })

                res.json({
                    result:{
                        followers:formattedFollowers
                    },
                    message:"Successfully fetched followers!",
                    meta:null
                })
            }else{
                next({code:200,message:"User have no followers!"});
            }
        } catch (error) {
            next(error)
        }  
    }
    getUserFollowing = async (req,res,next)=>{
        try {
            const {id} = req.params;
            const userDetails = await userSvc.getUserByFilter({_id:id});

            if(userDetails.following.length > 0){
              const following = await Promise.all(
                userDetails.following.map((id)=>{
                        return userSvc.getUserByFilter({_id:id});
                })
              );

                const formattedFollowing = following.map(({_id,firstname,lastname,occupation,location,picturePath})=>{
                    return {_id,firstname,lastname,occupation,location,picturePath};
                })

                res.json({
                    result:{
                        following:formattedFollowing
                    },
                    message:"Successfully fetched following!",
                    meta:null
                })
            }else{
                next({code:200,message:"User is not following anyone!"});
            }
        } catch (error) {
            next(error)
        }  
    }

 
    addRemoveFollowing = async (req, res, next) => {
        try {
            const { id, followingId } = req.params;
            const userDetails = await userSvc.getUserByFilter({ _id: id });
            const followingUser = await userSvc.getUserByFilter({ _id: followingId });
    
            let updatedFollowing = [];
            let updatedFollowingsFollowers = [];
    
            if (userDetails.following.includes(followingId)) {
                // Remove the followingId from the user's following list
                const followingObjectId = new ObjectId(followingId);
                updatedFollowing = userDetails.following.filter((userId) => !userId.equals(followingObjectId));
                console.log(updatedFollowing)
                // Remove the id from the following user's followers list
                const idObject = new ObjectId(id);
                updatedFollowingsFollowers = followingUser.followers.filter((followerId) => !followerId.equals(idObject));

                // Remove follow notification when unfolowed
                await notificationsCtrl.deleteNotificationUnfollow(followingId, id, 'follow');


            } else {
                // console.log("Follow samman pugew")
                // Add the followingId to the user's following list
                updatedFollowing = [...userDetails.following, followingId];
                // Add the id to the following user's followers list
                updatedFollowingsFollowers = [...followingUser.followers, id];

                 // Create follow notification
                 await notificationsCtrl.createNotification(followingId, id, 'follow');
            }
    
            // Update the user's following list
            const isUpdatedUser = await userSvc.updateUser({ _id: id }, { following: updatedFollowing });
            // Update the following user's followers list
            const isUpdatedFollowingUser = await userSvc.updateUser({ _id: followingId }, { followers: updatedFollowingsFollowers });
    
            // Fetch updated user and following user details
            const updatedUser = await userSvc.getUserByFilter({ _id: id });
            const updatedFollowingUser = await userSvc.getUserByFilter({ _id: followingId });
    
            // Omit password fields from the response
            delete updatedUser._doc.password;
            delete updatedFollowingUser._doc.password;
    
            res.json({
                result: {
                    isUpdatedUser,
                    isUpdatedFollowingUser,
                    user: updatedUser,
                    followingUser: updatedFollowingUser
                },
                message: "User updated successfully!",
                meta: null
            });
        } catch (error) {
            next(error);
        }
    };
    


}

const userCtrl = new UserController();
module.exports = userCtrl;