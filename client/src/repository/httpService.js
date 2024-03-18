import axiosInstance from "./axiosConfig";


   class HttpService {
     headers; 

     getHeader = (config) => {
       this.headers = {};
       if (config && config.file) {
         this.headers = {
           ...this.headers,
           'Content-Type': 'multipart/form-data'
         };
       }

       // here we'll set Authorization token too

       if(config && config.auth){
        let token;
        if(config.token){
          token=config.token;
        }else{
        const parsedState = JSON.parse(localStorage.getItem('persist:auth'));
        token = JSON.parse(parsedState?.token);
        }


         // Retrieve the token from Redux store
  // const token = useSelector((state) => state?.auth?.token);

        if(!token){
          throw new Error("Token not set!");
        }
        this.headers = {
          ...this.headers,
          "Authorization":`Bearer ${token}`
        }
       }
     };

     postRequest = async (url, data = {}, config = null) => {
       try {
         this.getHeader(config);
         const response = await axiosInstance.post(url, data, { headers: this.headers });
         return response;
       } catch (error) {
         throw error;
       }
     };

     getRequest = async (url, config = null) => {
       try {
         this.getHeader(config);
         const response = await axiosInstance.get(url, { headers: this.headers });
         return response;
       } catch (error) {
         throw error;
       }
     };
     patchRequest = async (url,data={}, config = null) => {
       try {
         this.getHeader(config);
         const response = await axiosInstance.patch(url,data, { headers: this.headers });
         return response;
       } catch (error) {
         throw error;
       }
     };
     deleteRequest = async (url, config = null) => {
       try {
         this.getHeader(config);
         const response = await axiosInstance.delete(url, { headers: this.headers });
         return response;
       } catch (error) {
         throw error;
       }
     };
   }

   export default HttpService;