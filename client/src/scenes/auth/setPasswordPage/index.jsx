import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import authSvc from '../authService';
import { toast } from 'react-toastify';
import {Spinner} from '@material-tailwind/react'
import SetPasswordComponent from '../../../components/auth/setPasswordComponent';

export default function SetPasswordPage() {
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  // TODO: to verify token API Call
  const params = useParams();
  const verifyToken = async ()=>{
      try {
          const verified = await authSvc.getActivationTokenVerify(params.token);
          console.log(verified);
          setLoading(false);
      } catch (error) {
          toast.error(error.message);            
      }
  }
  useEffect(()=>{
      verifyToken();
  },[params]);


  const submitEvent =async (data) =>{
    try {
      setLoading(true);
     const response = await  authSvc.activateUser(params.token,data);
     toast.success(response.message);
     setLoading(false);
     navigate('/login');
    } catch (error) {
     toast.error(error.message);
     setLoading(false);
     navigate("/");
    }
    
}


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className='w-fit shadow-lg h-auto px-10 py-2 sm:px-20  mx-auto rounded-tl-3xl rounded-br-3xl  bg-gradient-to-br from-gray-800 via-purple-200 to-pink-100'>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Set password
         </h2>
       </div>

       {
        (loading)?
        <Spinner className="h-16 w-16 text-gray-900/50" />:
        <SetPasswordComponent submitEvent={submitEvent} loading={loading}/>

       }

      
      </div>
      </div>
    </>

  )
}




