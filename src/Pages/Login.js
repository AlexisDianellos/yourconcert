import React,{useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);//to redirect to home page
  const { setUserInfo } = useContext(UserContext); // Destructure setUserInfo from UserContext
  const [token, setToken] = useState(''); // to display the token

  async function login(event){
    event.preventDefault();
    if(username && password){
      try{
        const response = await fetch('https://yourconcert-api.onrender.com/auth/login', {
          method: 'POST',//bc /register in backend is a .POST
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' }, // because it's a JSON we need to send some headers
          credentials: 'include', // this way if we have a cookie it will be considered as credentials
      });
      if (response.ok){
        response.json().then(userInfo => {
        setUserInfo(userInfo);
        //setRedirect(true);
        console.log('document ',document);
        console.log('Cookies after login:', document.cookie);

           // Store token in local storage
        localStorage.setItem('token', userInfo.token);
        setToken(userInfo.token); // set the token to display it on screen

        })
      } else{
        console.error('Login failed with status:', response.status);
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
        {/* Display the token */}
        {token && (
          <div className="mt-8 p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-bold">Your Token:</h2>
            <p className="text-sm break-all">{token}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
