import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Blogs from './Pages/Blogs'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Header from './Components/Header'
import FooterCom from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute'
import CreatePost from './Pages/CreatePost'
import { Datepicker } from "flowbite-react";
import Contact from './Pages/Contact'
import LandingPage from './Pages/LandingPage';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Datepicker weekStart={1}/>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
      <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path='create-post' element={<CreatePost/>}/>
      </Route>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/contactus' element={<Contact/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/> 
    </Routes>
    <FooterCom/>
    </BrowserRouter>
  )
}

export default App