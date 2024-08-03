import React,{useState} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

const DeletePost = () => {
  const { id } = useParams();
  const [redirect,setRedirect] = useState(false);

  const handleDelete = async(event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://yourconcert-api.onrender.com/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setRedirect(true);
      } else {
        console.error('Failed to delete post', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch', error);
    }
  };


  if(redirect){
    return <Navigate to={'/'}/>
  } 

  
  return (
    <div className='max-w-md mx-auto mt-36 text-centerr p-4'>
      <h1 className='text-2xl text-center font-bold'>Are you sure you want to delete this Review?</h1>
      <div className='mt-7 flex justify-center'>
        <button
          className='rounded-xl px-4 py-2 bg-red-500 hover:bg-red-600'
          onClick={handleDelete}
        >Delete</button>
        <Link
          to="/"
          className='rounded-xl px-4 py-2 ml-5 bg-blue-900 hover:bg-blue-800'
          >Go back</Link>
      </div>
    </div>
  )
};

export default DeletePost;