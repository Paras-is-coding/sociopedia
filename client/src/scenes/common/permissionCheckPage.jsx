import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authSvc from '../auth/authService';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout, setUser } from '../../redux/features/authSlice';
import { Spinner } from '@material-tailwind/react';
import { store } from '../../redux/store';


export default function PermissionCheck({Component}) {
        {/* Todo: Logic ie if loggedIn */}
        const dispatch = useDispatch();
        const navigate = useNavigate();
        console.log(store.getState());
        // const token = useSelector((state) => state?.auth?.token);
      const lsState = JSON.parse(localStorage.getItem('persist:auth'));
      const token = lsState?.token;

        
        const [loading,setLoading] = useState(true);

        // const [user,setUser] = useState();

       
        useEffect(()=>{

          const fetchData = async () =>{
            try {
              if(!token){
                toast.error("You are not logged in!");
                navigate('/login');
                return;
              }
              const response = await authSvc.getLoggedInUser();
              console.log("Get logged in ko response is  "+JSON.stringify(response));
              //redux action to update user data
              dispatch(setUser({authUser:response?.data?.authUser}));
              
            } catch (error) {
              // dispatch(setLogout());
              toast.error("You are not logged in!");
              navigate('/login');
              
            }
            finally{
              setLoading(false);
            }
          };
         
          fetchData();
        },[token]);

        
        if(loading){
          return(<>
           <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className='w-fit shadow-lg h-auto px-10 py-2 sm:px-20  mx-auto rounded-tl-3xl rounded-br-3xl  bg-gradient-to-br from-gray-800 via-purple-200 to-pink-100'>
        <Spinner className="h-16 w-16 text-gray-900/50" />:
      </div>
      </div>
          </>)
        }else{
          return Component;
        }
}
