import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import * as yup from 'yup';

export default function SetPasswordComponent
({submitEvent,loading}) {

    const yupSchema =  yup.object({
        password: yup
          .string()
          .required('Password is required')
          .matches(
            /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/,
            'Password: 8+ chars, 1 lowercase, 1 uppercase, 1 digit, 1 special character'
          ),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords do not match!')
          .required('Confirm Password is required'),
      });

          // react-hook-form implementation
   const {register, handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(yupSchema)
   });



  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form 
    onSubmit={handleSubmit(submitEvent)}
    className="space-y-6">

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            New password
          </label>
        </div>
        <div className="mt-2">
          <input
          {...register("password",{required:true})}
            id="password"
            name="password"
            type="password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
          />
          <span className='text-danger'>
                <em>{errors?.password?.message}</em>
            </span>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="repassword" className="block text-sm font-medium leading-6 text-gray-900">
            Confirm password
          </label>
        </div>
        <div className="mt-2">
          <input
          {...register("confirmPassword",{required:true})}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
          />
          <span className='text-danger'>
                <em>{errors?.confirmPassword?.message}</em>
            </span>
        </div>
      </div>

      <div>
        <button
        disabled={loading}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Login instead?{' '}
      <Link to={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
        Login
      </Link>
    </p>
  </div>
  )
}
