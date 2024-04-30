import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css";
import HomeLayout from '../layouts/home/homeLayout'
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
import FAQ from '../scenes/faqs';
import Team from '../scenes/team';
import PostPage from '../scenes/postPage';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/features/notificationSlice';

export default function Routing() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize WebSocket connection for notifications
    const socket = io(import.meta.env.WEBSOCKET_URL || 'http://localhost:3000/');
    
    // Listen for new notifications
    socket.on('connect', () => {
      console.log("Socket connected!");
    });

    socket.on('new-notification', (notification) => {
      // Dispatch action to update Redux store with new notification
      dispatch(addNotification(notification));
    });

    // Clean up socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

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
            <Route path='/faqs' element={<FAQ/>}></Route>
            <Route path='/team' element={<Team/>}></Route>
            <Route path='*' element={<Error404/>}/>
          </Route>

          {/* Different views after login */}
          <Route path='/home' element={<PermissionCheck Component={<HomeLayout/>}/>}>
            <Route index element={<HomePage/>}/>
            <Route path='chats' element={<ChatPage/>}/>
            <Route path='notifications' element={<NotificationsPage/>}/>
            <Route path=':userId' element={<ProfilePage/>}/>
            <Route path='settings' element={<SettingsPage/>}/>
            <Route path='post/:postId' element={<PostPage/>}/>
            <Route path='logout' element={<LogoutPage/>}/>
          </Route>

          <Route path='*' element={<Error404/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
