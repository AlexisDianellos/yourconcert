import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchContent, setSearchContent]=useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://yourconcert-api.onrender.com/profile', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userInfo = await response.json();
        setUserInfo(userInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchProfile();
  }, [setUserInfo]);

  function logout() {
    fetch('https://yourconcert-api.onrender.com/auth/logout', {
      credentials: 'include',
      method: 'POST',
    })
    .then(response => {
      if (response.ok) {
        setUserInfo(null);
        navigate('/');
      } else {
        throw new Error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Logout error:', error);
    });
  }

  function handleSearch() {
    console.log('Searching for: ', searchContent);
    navigate(`/search?query=${encodeURIComponent(searchContent)}`);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const username = userInfo?.username;

  return (
    <nav className='fixed top-0 left-0 w-full shadow-xl flex flex-col lg:flex-row md:flex-y sm:flex-row items-center justify-center p-4 sm:px-10 md:px-32 lg:px-80 backdrop-blur-xl z-50'>
      
      <div className='flex'>
      <Link className="flex items-center text-xl font-bold mr-3" to='/'>
        YourConcert
        <span className="material-symbols-outlined text-xl ml-1">
          music_note
        </span>
      </Link>
        <div className='flex items-center bg-blue-950 rounded-lg border border-gray-700 px-4 py-2 '>
          <span className="material-symbols-outlined text-xl text-gray-500 mr-2">
            search
          </span>
          <input
            type="text"
            placeholder='Search concerts'
            className=" w-24 focus:outline-none bg-blue-950 rounded-lg"
            onChange={(e)=>setSearchContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {username ? (
        <div className='flex items-center p-3'>
          <Link className="mr-4 ml-2" to="/create">
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
      ) : (
        <div className='font-bold flex items-center'>
          <Link className='hover:underline p-4 text-gray-400' to="/about">About</Link>
          <Link className='bg-teal-300 hover:bg-teal-500 text-blue-950 font-bold py-2 px-4 rounded-full inline-block no-underline' to='/register '>Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
