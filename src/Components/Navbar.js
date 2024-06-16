import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {setUserInfo,userInfo} = useContext(UserContext)
  const navigate = useNavigate();
  //check if im logged in with my token inside my cookies (check if its valid)
  useEffect(()=>{
    const fetchProfile = async ()=>{
      try{
        const response = await fetch('https://yourconcert-api.onrender.com/profile',{
          credentials:'include',
        })
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
        const userInfo = await response.json();
        setUserInfo(userInfo)

    }catch(error){
      console.error("Failed to fetch user info:", error);
    }
    }
    
    fetchProfile();   
  },[setUserInfo])

  function logout(){
    //reset cookie on backend
    fetch('https://yourconcert-api.onrender.com/logout',{
      credentials:'include',
      method:'POST',
    });
    setUserInfo(null)
    navigate('/');
  }

  const username = userInfo?.username;

  return (
    <nav className='fixed top-0 left-0 bg-blue-900 w-full flex items-center justify-between p-4 lg:pl-10 lg:pr-10 md:pl-32 md:pr-32 shadow-xl'> 
    <Link className="text-xl font-bold flex items-center" to='/'>
      YourConcert
      <span className="material-symbols-outlined text-xl ml-0">
        music_note
      </span>
    </Link>
    {username && (
      <div className='p-1'>
        <Link className="mr-4" to="/create">
          <span className="material-symbols-outlined text-2xl">
            add
          </span>
        </Link>
        <button onClick={logout}>
          <span className="material-symbols-outlined text-2xl">
            logout
          </span>
        </button>
      </div>
    )}
    {!username && (
      <button className='rounded-2xl mr-3 p-2 pl-3 pr-3 bg-blue-600 hover:bg-blue-500'>
        <Link className=' font-medium' to='/login'>Login</Link>
      </button>
    )}
  </nav>
  )
}

export default Navbar