import HttpService from "../../repository/httpService";

class NotificationsService extends HttpService {
  
  fetchNotifications = async (searchQuery = '', page = 1, limit = 50) => {
    try {
      const queryString = `?search=${searchQuery}&page=${page}&limit=${limit}`;
      const endpoint = `/notifications${queryString}`;
      const response = await this.getRequest(endpoint, { auth: true });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  markNotificationAsReadUnread = async (notificationId) => {
    try {
      const response = await this.patchRequest(`/notifications/mark-as-readunread/${notificationId}`,{},{auth:true});
      return response.data; 
    } catch (error) {
      throw error;
    }
  }
  markNotificationAsRead = async (notificationId) => {
    try {
      const response = await this.patchRequest(`/notifications/mark-as-read/${notificationId}`,{},{auth:true});
      return response.data; 
    } catch (error) {
      throw error;
    }
  }

  deleteNotification = async (notificationId) => {
    try {
      const response = await this.deleteRequest(`/notifications/${notificationId}`,{auth:true});
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
}

const notificationsSvc = new NotificationsService();
export default notificationsSvc;
