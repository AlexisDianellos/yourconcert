import React,{useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);//to redirect to home page
  const { setUserInfo } = useContext(UserContext); // Destructure setUserInfo from UserContext

  async function login(event){
    event.preventDefault();
    alert('Login initiated for user:', username);
    if(username && password){
      try{
        const response = await fetch('https://yourconcert-api.onrender.com/auth/login', {
          method: 'POST',//bc /register in backend is a .POST
          body: JSON.stringify({username,password}),
          headers: {'Content-Type':'application/json'}, //bc its a json we need to send some headers
          credentials:'include',//this way if we have a cookie it will be considered as credentials
      });
      if (response.ok){
        //alert('Login response received successfully');
        //response.json().then(userInfo => {
         // alert('User info received:', userInfo);
         // setUserInfo(userInfo);
         // setRedirect(true);
         const rawResponse = await response.text();
         alert('Raw response:', rawResponse); // Check the raw response
         const userInfo = JSON.parse(rawResponse);
         alert('Parsed userInfo:', userInfo); // Log parsed user info
         setUserInfo(userInfo);
         setRedirect(true);
        
      } else{
        alert('Login failed with status:', response.status);
        alert('Incorrect Username or Password')
      }
      } catch(error){
        console.error('Error Logging In: ', error);
      }
      
    } else{
      alert('Enter Username and Password')
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>//redirect to home page
  }

  return (
    <div className="flex h-screen justify-center items-start pt-32">
      <div className="w-full max-w-md p-8">
        <form className="space-y-7" onSubmit={login}>
        <h1 className="text-3xl font-bold mb-10 ml-3">Welcome back,</h1>
          <div>
            <input
              type="text"
              className="w-full rounded-2xl px-4 py-2 focus:outline-none text-white bg-blue-800 placeholder-gray-300"
              placeholder='Username'
              value={username}
              onChange={e=>setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full rounded-2xl px-4 py-2 focus:outline-none text-white bg-blue-800 placeholder-gray-300"
              placeholder='Password'
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <div className='flex justify-center'>
            <p className='mr-1'>New to YourConcert?</p>
            <Link to="/register" className='text-blue-400 hover:text-blue-300'>Register</Link>
          </div>
          <button type="submit" className="w-full bg-blue-900 rounded-2xl py-3 font-semibold text-white hover:bg-blue-800 transition-colors duration-300">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
