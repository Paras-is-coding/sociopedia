 
import HttpService from "../../repository/httpService";

class UserService extends HttpService {
  
  getUser = async (userId)=>{
    try {
      // const parsedState = JSON.parse(localStorage.getItem('persist:auth'));
      // const uid = (JSON.parse(parsedState?.user))?._id;
      
      const userDetailsEndPoint = `user/${userId}`;
      const response = await this.getRequest(userDetailsEndPoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }

  
  getAllUsers = async (searchQuery) => {
    try {
      const endpoint = `user${searchQuery ? `?search=${searchQuery}` : ''}`;
      const response = await this.getRequest(endpoint, { auth: true });
      return response;
    } catch (error) {
      throw error;
    }
  }



  getUserFollowers = async (userId)=>{
    try {
      let uid=null;
      if(!userId){
      const parsedState = JSON.parse(localStorage.getItem('persist:auth'));
      uid = (JSON.parse(parsedState?.user))?._id;
      }
      
      const userFollowersEndPoint = `user/${userId?userId:uid}/followers`;
      const response = await this.getRequest(userFollowersEndPoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  getUserFollowing = async (userId)=>{
    try {
      let uid=null;
      if(!userId){
      const parsedState = JSON.parse(localStorage.getItem('persist:auth'));
      uid = (JSON.parse(parsedState?.user))?._id;
      }
      
      const userFollowingEndPoint = `user/${userId?userId:uid}/following`;
      const response = await this.getRequest(userFollowingEndPoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  addRemoveFollowing = async (id)=>{
    try {

      const parsedState = JSON.parse(localStorage.getItem('persist:auth'));
      const uid = (JSON.parse(parsedState?.user))?._id;


      const addRemoveFollowingEP = `user/${uid}/${id}`;
      const response = await this.patchRequest(addRemoveFollowingEP,{},{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  editUserProfile = async (data)=>{
    try {
      const parsedState = JSON.parse(localStorage.getItem('persist:auth'));
      const uid = (JSON.parse(parsedState?.user))?._id;
      const editProfileEP = `user/${uid}/editProfile`;
      const response = await this.patchRequest(editProfileEP,data,{auth:true,file:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }



  
}

const userSvc = new UserService();
export default userSvc;