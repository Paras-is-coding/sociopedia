import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css";

import HomeLayout from '../layouts/home/homeLayout'
// import LandingPage from '../scenes/landingPage'
import { ForgetPasswordPage, LoginPage, RegisterPage, SetPasswordPage } from '../scenes/auth'
import Error404 from '../scenes/common/errorPage'
import PermissionCheck from '../scenes/common/permissionCheckPage'
import HomePage from '../scenes/homePage';
import ChatPage from '../scenes/chatPage';
import LandingLayout from '../layouts/landing/landingLayout';
import NotificationsPage from '../scenes/notificationsPage';
import ProfilePage from '../scenes/profilePage';
import SettingsPage from '../scenes/settingsPage';
import LogoutPage from '../scenes/logoutPage';

export default function Routing() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
    <Routes>

        {/* Nesting of routes -- parent/child routes */}
        <Route path='/' element={<LandingLayout/>}>
            <Route index element={<RegisterPage/>}></Route>
            <Route path='register' element={<RegisterPage/>}></Route>
            <Route path='/activate/:token' element={<SetPasswordPage/>}></Route>
            <Route path='/forget-password' element={<ForgetPasswordPage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>

            <Route path='*' element={<Error404/>}/>
        </Route>


         {/* different view after login */}
         <Route path='/home' element={<PermissionCheck Component={<HomeLayout/>}/>}>
         {/* <Route path='/home' element={<HomeLayout/>}> */}
                <Route index element={<HomePage/>}/>
                <Route path='chats' element={<ChatPage/>}/>
                <Route path='notifications' element={<NotificationsPage/>}/>
                <Route path=':userId' element={<ProfilePage/>}/>
                <Route path='settings' element={<SettingsPage/>}/>
                <Route path='logout' element={<LogoutPage/>}/>

            </Route>
          

          <Route path='*' element={<Error404/>}/>
        
    </Routes>
    </BrowserRouter>

    </>
  )
}
