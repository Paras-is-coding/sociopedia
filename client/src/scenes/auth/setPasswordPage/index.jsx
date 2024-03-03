import React from 'react'
import { Link } from 'react-router-dom'

export default function SetPasswordPage() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className='w-fit shadow-lg h-auto px-10 py-2 sm:px-20  mx-auto rounded-tl-3xl rounded-br-3xl  bg-gradient-to-br from-gray-800 via-purple-200 to-pink-100'>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Set password
         </h2>
       </div>

       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <form className="space-y-6" action="#" method="POST">

           <div>
             <div className="flex items-center justify-between">
               <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                 New password
               </label>
             </div>
             <div className="mt-2">
               <input
                 id="password"
                 name="password"
                 type="password"
                 required
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>
           <div>
             <div className="flex items-center justify-between">
               <label htmlFor="repassword" className="block text-sm font-medium leading-6 text-gray-900">
                 Re-enter password
               </label>
             </div>
             <div className="mt-2">
               <input
                 id="repassword"
                 name="repassword"
                 type="password"
                 required
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>

           <div>
             <button
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
      </div>
      </div>
    </>

  )
}
