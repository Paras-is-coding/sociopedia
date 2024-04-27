import React, { useState } from 'react'
// import sociopedialogo from '../../../assets/images/sociopedialogo.png'
import { Link, useNavigate } from 'react-router-dom'


import {toast} from 'react-toastify';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import{useForm} from 'react-hook-form';
import authSvc from '../authService';

export default function RegisterPage() {
const[loading,setLoading] = useState(false);
// const navigate = useNavigate();

const registerSchema = yup.object({
  firstname:yup.string().min(2).max(30).required(),
  lastname:yup.string().min(2).max(30).required(),
  email:yup.string().email().required(),
});


// react-hook-form implementation
const {register, handleSubmit,setValue,setError,reset, formState:{errors}} = useForm({
  resolver:yupResolver(registerSchema)
});



const registerSubmit = async (data) =>{
  try{
    setLoading(true);

      // API Call
      const response = await authSvc.registerProcess(data);
        setLoading(false);
        reset();
        toast.success(response?.data?.message)

        // navigate('/');
  }catch(e){
    setLoading(false);
    console.log("err",e);
    toast.error(e?.response?.data?.message[0])
    // e.response.data.message.map((obj)=>{
    //   const keys = Object.keys(obj);
    //   setError(keys[0],obj[keys[0]]);
    // });
  }

}

  return (

    <>
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  ">
        <div className='w-fit shadow-lg h-auto px-10 py-2 sm:px-20  mx-auto rounded-tl-3xl rounded-br-3xl  bg-gradient-to-br from-gray-400  to-white '>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto rounded-xl"
            src={sociopedialogo}
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-customDark">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(registerSubmit)} className="space-y-6">

          <div>
              <div className="flex items-center justify-between">
                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                  Firstname
                </label>
              </div>
              <div className="mt-2">
                <input
                {...register("firstname",{required:true,disabled:loading})}
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <span className="text-danger">
                    <em>{errors?.firstname?.message}</em>
                  </span>
          <div>
              <div className="flex items-center justify-between">
                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                  Lastname
                </label>
              </div>
              <div className="mt-2">
                <input
            {...register("lastname",{required:true,disabled:loading})}
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
              <span className="text-danger">
                    <em>{errors?.lastname?.message}</em>
                  </span>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                {...register("email",{required:true,disabled:loading})}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
              <span className="text-danger">
                    <em>{errors?.email?.message}</em>
                  </span>
            </div>

            

            <div>
              <button
              disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
        </div>
      </div>
    </>
  )
}
