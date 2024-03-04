import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup';
import authSvc from '../authService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


export default function LoginPage() {
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  const loginSchema = yup.object({
    email:yup.string().email().required(),
    password: yup
    .string()
    .required('Password is required')
});


// react-hook-form implementation
const {register, handleSubmit, formState:{errors}} = useForm({resolver:yupResolver(loginSchema)});


const loginSubmit = async (data) =>{
  try{
      setLoading(true);      
        // API Call
      const response = await authSvc.loginProcess(data);
          console.log(response)
          setLoading(false);

          toast.success(`Successfully logged in!`)
          navigate('/home');
    }catch(e){
      setLoading(false);
      console.log(e);
      toast.error(e.response.data.message)
      // e.response.data.message.map((obj)=>{
      //   const keys = Object.keys(obj);
      //   setError(keys[0],obj[keys[0]]);
      // });
    }
}


// For next time click on login
const isLoggedIn = useSelector(state => state?.token !== null);
useEffect(()=>{
  if(isLoggedIn){
      toast.info("You're already logged in!")
      navigate('/home');
  }
},[isLoggedIn])

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className='w-fit shadow-lg h-auto px-10 py-2 sm:px-20  mx-auto rounded-tl-3xl rounded-br-3xl  bg-gradient-to-br from-gray-800 via-purple-200 to-pink-100'>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Login to your account
         </h2>
       </div>

       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <form
         onSubmit={handleSubmit(loginSubmit)}
          className="space-y-6">
           <div>
             <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
               Email address
             </label>
             <div className="mt-2">
               <input
               {...register("email",{required:true})}
                 id="email"
                 name="email"
                 type="email"
                 autoComplete="email"
                 required
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
               />
               <span className='text-danger'>
                            <em>{errors?.email?.message}</em>
                            </span>
             </div>
           </div>

           <div>
             <div className="flex items-center justify-between">
               <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                 Password
               </label>
               <div className="text-sm">
                 <Link to={'/forget-password'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                   Forgot password?
                 </Link>
               </div>
             </div>
             <div className="mt-2">
               <input
               {...register("password",{required:true})}
                 id="password"
                 name="password"
                 type="password"
                 autoComplete="current-password"
                 required
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
               />
               <span className='text-danger'>
                                <em>{errors?.password?.message}</em>
                            </span>
             </div>
           </div>

           <div>
             <button
               type="submit"
               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
               Login
             </button>
           </div>
         </form>

         <p className="mt-10 text-center text-sm text-gray-500">
           Do not have an account?{' '}
           <Link to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Register
           </Link>
         </p>
       </div>
      </div>
      </div>
    </>

  )
}
