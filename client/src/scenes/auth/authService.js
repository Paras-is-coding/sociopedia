import { setLogin, setUser } from "../../redux/features/authSlice";
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

  loginProcess = async(userData,dispatch)=>{
    try {
      const loginEndpoint = 'auth/login';
      const response = await this.postRequest(loginEndpoint,userData);
      console.log('response is '+JSON.stringify(response))
   
      console.log(response.data.token+"and "+ response.data.refreshToken)
      // localStorage.setItem('_au',response.data.token)
      // localStorage.setItem('_rt',response.data.refreshToken)

        // Dispatch action to store login data in Redux
        dispatch(setLogin({
          token: response?.data?.token,
          refreshToken: response?.data?.refreshToken,
        }));

        // Dispatch authUser
        const user = await this.getLoggedInUser();
        console.log("user is "+user)
        dispatch(setUser(user?.authUser));


      

      return response;
      
    } catch (error) {
      throw error;      
    }
  }

  getLoggedInUser = async (token)=>{
    try {
      const userDetailsEndPoint = 'auth/me';
      const response = await this.getRequest(userDetailsEndPoint,{auth:true,token:token});
      return response;
    } catch (error) {
      throw error;      
    }
  }



  
}

const authSvc = new AuthService();
export default authSvc;