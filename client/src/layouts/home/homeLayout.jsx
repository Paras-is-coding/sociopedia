import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarComponent from '../../components/Sidebar1/sidebarComponent'
import './homeLayout.css'

export default function HomeLayout() {
  return (
    <>
   <div className="home">
   <div className="sidebar">
    <SidebarComponent/>
    </div>
    <div className="main">
    <Outlet/>
    </div>
   </div>
  </>
  )
}
