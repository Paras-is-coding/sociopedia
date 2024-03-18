 
import HttpService from "../../repository/httpService";

class PostService extends HttpService {
  
  createPost = async (postData)=>{
    try {
      const createPostEndPoint = `posts`;
      const response = await this.postRequest(createPostEndPoint,postData,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  getAllPosts = async ()=>{
    try {
      const createPostEndPoint = `posts`;
      const response = await this.getRequest(createPostEndPoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  getUserPosts = async ()=>{
    try {
      const parsedState = JSON.parse(localStorage.getItem('persist:auth'));
      const uid = (JSON.parse(parsedState?.user))?._id;
      
      const createPostEndPoint = `posts/${uid}`;
      const response = await this.getRequest(createPostEndPoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  getUserFollowers = async ()=>{
    try {
      const feedPostsEndPoint = `posts`;
      const response = await this.getRequest(feedPostsEndPoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  getUserFollowing = async ()=>{
    try {
      const parsedState = JSON.parse(localStorage.getItem('persist:auth'));
      const uid = (JSON.parse(parsedState?.user))?._id;
      
      const userPostsEndPoint = `posts/${uid}`;
      const response = await this.getRequest(userPostsEndPoint,{auth:true});
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
      const response = await this.patchRequest(addRemoveFollowingEP,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }

  addLike = async (likeData)=>{
    try {
      const likeEndPoint = `likes/like`;
      const response = await this.postRequest(likeEndPoint,likeData,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  unlike = async (postId,userId)=>{
    try {
      const unlikeEndPoint = `likes/unlike/${postId}?userId=${userId}`;
      const response = await this.deleteRequest(unlikeEndPoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  likesForPost = async (postId)=>{
    try {
      const likesForPostEndPoint = `likes/post/${postId}`;
      const response = await this.getRequest(likesForPostEndPoint);
      return response;
    } catch (error) {
      throw error;      
    }
  }
  isLikedByUser = async (postId,userId)=>{
    try {
      const isLikedEP = `likes/isliked/${postId}?userId=${userId}`;
      const response = await this.getRequest(isLikedEP,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  addComment = async (commentData)=>{
    try {
      const commentEndPoint = `comments/comment`;
      const response = await this.postRequest(commentEndPoint,commentData,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  deleteComment = async (postId)=>{
    try {
      const deleteCommentEndPoint = `comments/uncomment/${postId}`;
      const response = await this.deleteRequest(deleteCommentEndPoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  commentsForPost = async (postId)=>{
    try {
      const commentsForPostEndPoint = `comments/post/${postId}`;
      const response = await this.getRequest(commentsForPostEndPoint);
      return response;
    } catch (error) {
      throw error;      
    }
  }



  
}

const postSvc = new PostService();
export default postSvc;