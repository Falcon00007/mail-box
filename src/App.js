import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/navbar/Header";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/pages/Home"
import MailComponent from "./components/mailbox/MailComponent";

function App() {
  const isLoggedIn= useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <>
    <Header/>
    <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/> 
    {isLoggedIn && <Route path="/home" element={<Home/>}/> }
    {isLoggedIn && <Route path="/mail" element={<MailComponent/>}/>}
   {!isLoggedIn && <Route path='*' element={<Navigate to='/login'/>}/>}
   {!isLoggedIn && <Route path='*' element={<Navigate to='/home'/>}/>}
    </Routes>
    </>
  )     
}

export default App;
