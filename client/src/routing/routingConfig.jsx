import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import HomeLayout from '../layouts/home/homeLayout'
// import LandingPage from '../scenes/landingPage'
import { ForgetPasswordPage, LoginPage, RegisterPage, SetPasswordPage } from '../scenes/auth'

export default function Routing() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
    <Routes>

        {/* Nesting of routes -- parent/child routes */}
        <Route path='/' element={<HomeLayout/>}>
            <Route index element={<RegisterPage/>}></Route>
            <Route path='register' element={<RegisterPage/>}></Route>
            <Route path='/activate/:token' element={<SetPasswordPage/>}></Route>
            <Route path='/forget-password' element={<ForgetPasswordPage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
        </Route>

        
    </Routes>
    </BrowserRouter>

    </>
  )
}
