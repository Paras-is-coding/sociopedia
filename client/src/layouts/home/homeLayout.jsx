import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarComponent from '../../components/Sidebar1/sidebarComponent'
import './homeLayout.css'
import HorizontalNavBar from '../../components/Sidebar1/horizontalNavbar'

export default function HomeLayout() {
  return (
    <>
   <div className="home ">
   <div className="sidebar hidden sm:w-20 sm:flex md:w-60 ">
    <SidebarComponent/>
    </div>
    <div className="main h-[94vh] sm:h-[100vh]">
    <Outlet/>
    </div>
   </div>
   <div className='horizontalsidebar sticky z-100 bottom-0 left-0 sm:hidden '>
      <HorizontalNavBar/>
    </div>
  </>
  )
}
