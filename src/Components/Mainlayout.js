import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Sidebar from './Sidebar';
import Profile from './Profile';

const Mainlayout = () => {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default Mainlayout
