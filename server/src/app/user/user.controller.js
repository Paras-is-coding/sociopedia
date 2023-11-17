const userSvc = require("./user.services");

class UserController{
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


    getUserFriends = async (req,res,next)=>{
        try {
            const {id} = req.params;
            const userDetails = await userSvc.getUserByFilter({_id:id});

            if(userDetails.friends.length > 0){
              const friends = await Promise.all(
                userDetails.friends.map((id)=>{
                        return userSvc.getUserByFilter({_id:id});
                })
              );

                const formattedFriends = friends.map(({_id,firstname,lastname,occupation,location,picturePath})=>{
                    return {_id,firstname,lastname,occupation,location,picturePath};
                })

                res.json({
                    result:{
                        friends:formattedFriends
                    },
                    message:"Successfully fetched friends!",
                    meta:null
                })
            }else{
                next({code:200,message:"User have no friends!"});
            }
        } catch (error) {
            next(error)
        }  
    }

    addRemoveFriend = async (req,res,next)=>{
        try {
            const {id,friendId} = req.params;
            const userDetails = await userSvc.getUserByFilter({_id:id});
            const friend = await userSvc.getUserByFilter({_id:friendId});


            let updatedFriends, updatedFriendFriends;

            if(userDetails.friends.includes(friendId)){
                updatedFriends = userDetails.friends.filter((friend)=> friend !== friendId);
                updatedFriendFriends = friend.friends.filter((friend)=> friend !== id);
            }else{
                updatedFriends = [...userDetails.friends,friendId];
                updatedFriendFriends = [...friend.friends,id];
            }

            const isUpdatedUser = await userSvc.updateUser({_id:id},{friends:updatedFriends});
            const isUpdatedFriend = await userSvc.updateUser({_id:friendId},{friends:updatedFriendFriends});
            const updatedUser = await userSvc.getUserByFilter({_id:id});
            const updatedFriend = await userSvc.getUserByFilter({_id:friendId});
            delete updatedUser._doc.password;
            delete updatedFriend._doc.password;

            res.json({
                result:{
                    isUpdatedUser,
                    isUpdatedFriend,
                    user:updatedUser,
                    friend:updatedFriend
                },
                message:"User updated successfully!",
                meta:null
            })

        } catch (error) {
            next(error)            
        }
    }
    


}

const userCtrl = new UserController();
module.exports = userCtrl;