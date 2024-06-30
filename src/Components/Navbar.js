import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    fetch('https://yourconcert-api.onrender.com/logout', {
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

  const username = userInfo?.username;

  return (
    <nav className='fixed top-0 left-0 w-full bg-blue-900 shadow-xl flex items-center justify-between p-4 sm:px-10 md:px-32 lg:px-80'>
      <Link className="flex items-center text-xl font-bold" to='/'>
        YourConcert
        <span className="material-symbols-outlined text-xl ml-2">
          music_note
        </span>
      </Link>
      <div className="hidden sm:flex items-center flex-1 mx-4">
        <input
          type="text"
          placeholder='Search for concerts'
          className="w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none text-slate-200 bg-blue-500 placeholder-slate-200"
          onChange={(e)=>setSearchContent(e.target.value)}
        />
        <button
          className="ml-1 p-1 rounded-full bg-blue-600 text-white hover:bg-blue-400"
          onClick={handleSearch}
        >
          <span className="material-symbols-outlined">
            search
          </span>
        </button>
      </div>
      <button className="sm:hidden rounded-xl bg-blue-600 px-2 py-1" onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="material-symbols-outlined font-bold">
          search
        </span>
      </button>
      {isDropdownOpen && (
        <div className="flex flex-row items-center absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 bg-blue-700 p-4 rounded-2xl">
           <span className="font-bold material-symbols-outlined" onClick={(e)=>setIsDropdownOpen(false)}>
            arrow_back
          </span>
          <input
            type="text"
            placeholder='Search for concerts'
            className="w-full p-2 rounded-xl shadow-sm focus:outline-none text-slate-200 bg-blue-500 placeholder-slate-200 mr-2 ml-2"
            onChange={(e)=>setSearchContent(e.target.value)}
          />
          <button
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500"
            onClick={handleSearch}
          >
            <span className="material-symbols-outlined font-bold">
              search
            </span>
          </button>
        </div>
      )}
      {username ? (
        <div className='flex items-center'>
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
      ) : (
        <button className='rounded-2xl mr-3 p-2 bg-blue-600 hover:bg-blue-700 text-white'>
          <Link className='font-medium' to='/login'>Login</Link>
        </button>
      )}
    </nav>
  );
}

export default Navbar;
