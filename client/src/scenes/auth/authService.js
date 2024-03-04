import { setLogin } from "../../redux/features/authSlice";
import { store } from "../../redux/store";
import HttpService from "../../repository/httpService";

class AuthService extends HttpService {
  registerProcess = async (userData) => {
    try {
      // Define your API endpoint for user registration
      const registerEndpoint = 'auth/register';

      // Use postRequest from HttpService to make the registration request
      const response = await this.postRequest(registerEndpoint, userData);

      // Process the response as needed (e.g., handle success or error cases)
      return response;
    } catch (error) {
      throw error;
    }
  };


  getActivationTokenVerify = async (token)=>{
    try {
        const verifyEndpoint = 'auth/verify-token/';
        const response = await this.getRequest(verifyEndpoint+token);
        return response;
    } catch (error) {
        throw error;        
    }
  }

  activateUser = async(token,data)=>{
    try {
      const activateEndPoint = 'auth/set-password/';
      const  response = await this.postRequest(activateEndPoint+token,data);
      return response;
    } catch (error) {
      throw error;      
    }
  }

  loginProcess = async(userData)=>{
    try {
      const loginEndpoint = 'auth/login';
      const response = await this.postRequest(loginEndpoint,userData);
      console.log('response is '+response)
      // localStorage.setItem('_au',response.data.token)
      // localStorage.setItem('_rt',response.data.refreshToken)

        // Dispatch action to store login data in Redux
        store.dispatch(setLogin({
          token: response.data.token,
          refreshToken: response.data.refreshToken,
        }));

      return response;
      
    } catch (error) {
      throw error;      
    }
  }

  getLoggedInUser = async ()=>{
    try {
      const userDetailsEndPoint = 'auth/me';
      const response = await this.getRequest(userDetailsEndPoint,{auth:true});
      return response;
    } catch (error) {
      throw error;      
    }
  }



  
}

const authSvc = new AuthService();
export default authSvc;