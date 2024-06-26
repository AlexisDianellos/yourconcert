import React,{useState} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

const DeletePost = () => {
  const { id } = useParams();
  const [redirect,setRedirect] = useState(false);

  const handleDelete = async(event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://yourconcert-api.com/post/${id}`, {
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
    <div className='max-w-md mx-auto mt-24 text-center rounded-xl bg-blue-400 p-4'>
      <h1 className='text-2xl font-bold'>Are you sure you want to delete this Review?</h1>
      <div className='mt-7'>
        <button
          className='rounded-xl p-2 bg-red-400 hover:bg-red-300'
          onClick={handleDelete}
        >Delete</button>
        <Link
          to="/"
          className='rounded-xl p-2 ml-5 bg-blue-500 hover:bg-blue-300'
          >Go back</Link>
      </div>
    </div>
  )
};

export default DeletePost;