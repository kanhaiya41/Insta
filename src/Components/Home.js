import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '../hooks.js/userGetAllPost'
import useGetSuggestUsers from '../hooks.js/userGesSuggestedUsers'

const Home = () => {
  useGetAllPost();
  useGetSuggestUsers();
  return (
    <>
      <Sidebar />
      <div className='homemaindiv'>
        <div className='homediv'>
        <Feed/>
        <Outlet/>
        </div>
        <RightSidebar/>
      </div>
      
    </>
  )
}

export default Home
