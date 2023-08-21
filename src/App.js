import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/navbar/Header";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ForgetPassword from "./components/auth/ForgetPassword";
import Home from "./components/pages/Home"
import About from "./components/pages/About";
import Inbox from "./components/mailbox/Inbox";
import OpenMails from "./components/mailbox/OpenMails";
import DeletedMails from "./components/mailbox/DeletedMails";

function App() {
  const isLoggedIn= useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
    <Header/>
    <Routes>
    {!isLoggedIn && <Route path="/signup" element={<Signup/>}/>}
   {!isLoggedIn && <Route path="/login" element={<Login/>}/>}   
   <Route path="/about" element={<About/>}/>
   {isLoggedIn && <Route path="/home" element={<Home/>}/> }
   {isLoggedIn && <Route path="/inbox" element={<Inbox/>}/>}
   {isLoggedIn && <Route path="/inbox/:id" element={<OpenMails/>}/>}
   {isLoggedIn && <Route path="/inbox/deletedMails/:id" element={<DeletedMails/>}/>}
   {!isLoggedIn && <Route path="/forgetpassword" element={<ForgetPassword/>}/>}
   {!isLoggedIn && <Route path='*' element={<Navigate to='/login'/>}/>}
   {isLoggedIn && <Route path='*' element={<Navigate to='/home'/>}/>}
    </Routes>
    </>
  )     
}

export default App;
