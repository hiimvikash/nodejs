import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../Components/Navbar"

function DashLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default DashLayout