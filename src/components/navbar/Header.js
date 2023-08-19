import React from 'react'
import Navbar from "./Navbar"

const Header = (props) => {
  return (
    <>
    <Navbar/>
    <main>{props.children}</main>
    </>
  )
}

export default Header