import React from 'react'
import Navbar from '../../scenes/navbar'
import { Outlet } from 'react-router-dom'

export default function LandingLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}
