import { setLogin, setUser } from "../../redux/features/authSlice";
import HttpService from "../../repository/httpService";

class AuthService extends HttpService {
  registerProcess = async (userData) => {
    try {
      // Define your API endpoint for user registration
      const registerEndpoint = "auth/register";

      // Use postRequest from HttpService to make the registration request
      const response = await this.postRequest(registerEndpoint, userData);

      // Process the response as needed (e.g., handle success or error cases)
      return response;
    } catch (error) {
      throw error;
    }
  };

  getActivationTokenVerify = async (token) => {
    try {
      const verifyEndpoint = "auth/verify-token/";
      const response = await this.getRequest(verifyEndpoint + token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  activateUser = async (token, data) => {
    try {
      const activateEndPoint = "auth/set-password/";
      const response = await this.postRequest(activateEndPoint + token, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  loginProcess = async (userData, dispatch) => {
    try {
      const loginEndpoint = "auth/login";
      const response = await this.postRequest(loginEndpoint, userData);
      
      const { token, refreshToken } = await response.data;

      // Dispatch action to store login data in Redux
      dispatch(setLogin({ token, refreshToken }));

     

    // Dispatch action to get user details and set them in the Redux store
    const userResponse = await this.getLoggedInUser(token);
    dispatch(setUser(await userResponse.data.authUser));

      return response;
    } catch (error) {
      throw error;
    }
  };

  getLoggedInUser = async (token) => {
    try {
      const userDetailsEndPoint = "auth/me";
      const response = await this.getRequest(userDetailsEndPoint, {
        auth: true,
        token: token,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const authSvc = new AuthService();
export default authSvc;
