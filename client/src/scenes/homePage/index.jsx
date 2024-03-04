import React from 'react'
import SearchBar from '../../components/searchBar'
import { Outlet } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
    <SearchBar/>
    <Outlet/>
    </>
  )
}
