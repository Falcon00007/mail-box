import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/pages/Home"

function App() {
  const isLoggedIn= useSelector((state) => state.auth.isLoggedin);
  console.log(isLoggedIn);

  return (
    <>
    <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/> 
    <Route path="/home" element={<Home/>}/> 
    
    <Route path='*' element={<Navigate to='/login'/>}/>
    </Routes>
    </>
  )     
}

export default App;
