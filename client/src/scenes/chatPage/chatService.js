import HttpService from "../../repository/httpService";

class ChatService extends HttpService {
 

  addMsg = async (data)=>{
    try {
      const addMsgEndPoint = 'message/addmsg';
      const response = await this.postRequest(addMsgEndPoint,data,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }
  getMsgs = async (data)=>{
    try {
      const getMsgsEndPoint = 'message/getmsg';
      const response = await this.postRequest(getMsgsEndPoint,data,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }



  
}

const chatSvc = new ChatService();
export default chatSvc;