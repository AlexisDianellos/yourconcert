import React, { useEffect, useState } from 'react';
import Post from '../Components/Post';

const Home = () => {
    
  const [posts,setPosts]=useState(null);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch('https://yourconcert-api.onrender.com/posts', {
            credentials: 'include', // Include this if your backend requires cookies
          });
          if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
          }
          const posts = await response.json();
          setPosts(posts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      fetchPosts();
    }, []);

    if (!posts) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center font-bold text-3xl text-white">⌛</div>
        </div>
      );
    }

  return (
    <div className='flex flex-col items-center mt-24 p-5'>
      <div className="w-full max-w-2xl ml-5 mr-5 lg:ml-0 lg:mr-0 md:ml-0 md:mr-0 pb-5">
        {posts.length > 0 && posts.map((post,index) => (
          <Post
            key={index}
            {...post}
          />
        ))}
      </div>
    </div>
  )
}

export default Home;
