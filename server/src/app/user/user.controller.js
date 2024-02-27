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

    addRemoveFollowing = async (req,res,next)=>{
        try {
            const {id,followingId} = req.params;
            const userDetails = await userSvc.getUserByFilter({_id:id});
            const following = await userSvc.getUserByFilter({_id:followingId});


            let updatedFollowing, updatedFollowingsFollowers;

            if(userDetails.following.includes(followingId)){
                updatedFollowing = userDetails.following.filter((following)=> following !== followingId);
                updatedFollowingsFollowers = following.followers.filter((follower)=> follower !== id);
            }else{
                updatedFollowing = [...userDetails.following,followingId];
                updatedFollowingsFollowers = [...following.followers,id];
            }

            const isUpdatedUser = await userSvc.updateUser({_id:id},{following:updatedFollowing});
            const isUpdatedFollowings = await userSvc.updateUser({_id:followingId},{following:updatedFollowingsFollowers});
            const updatedUser = await userSvc.getUserByFilter({_id:id});
            const updatedFollowings = await userSvc.getUserByFilter({_id:followingId});
            delete updatedUser._doc.password;
            delete updatedFollowings._doc.password;

            res.json({
                result:{
                    isUpdatedUser,
                    isUpdatedFollowings,
                    user:updatedUser,
                    friend:updatedFollowings
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