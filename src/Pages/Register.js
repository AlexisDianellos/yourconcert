import React,{useState} from 'react';
import {Navigate} from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);

  async function register(event){
    event.preventDefault();
      const response = await fetch('https://yourconcert-api.com/register', {
      method:'POST', //bc /register in backend is a .POST
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'}, //bc its a json we need to send some headers
    });
    if (response.status===200) {
      alert('Registration successful')
      setRedirect(true);
    }
    else {
      alert('Failed to register.');
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>//redirect to home page
  }

  return (
    <div className="flex h-screen justify-center items-start pt-32 ">
      <div className="w-full max-w-md p-8">
        <form className="space-y-6" onSubmit={register}>
        <h1 className="text-2xl font-bold mb-4 ml-3">Register</h1>
          <div>
            <input
              type="text"
              className="w-full rounded-2xl px-4 py-2 focus:outline-none text-black bg-blue-200"
              placeholder='Username'
              value={username}
              onChange={e=>setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full rounded-2xl px-4 py-2 focus:outline-none text-black bg-blue-200"
              placeholder='Password'
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <div className='flex justify-center'>
            <p className='mr-1'>Already on YourConcert?</p>
            <Link to="/login" className='text-blue-900 hover:text-black'>Login</Link>
          </div>
          <button type="submit" className="w-full bg-blue-900 rounded-2xl py-3 font-semibold hover:bg-blue-800">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register
