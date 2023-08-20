import React from 'react'
import { useSelector } from "react-redux";
import Navbar from "./Navbar"
import Sidebar from '../pages/Sidebar';

const Header = (props) => {
  const isLoggedIn= useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
    <Navbar/>
    {isLoggedIn && <Sidebar/>}
    <main>{props.children}</main>
    </>
  )
}

export default Header