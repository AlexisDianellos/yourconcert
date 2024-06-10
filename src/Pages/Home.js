import React, { useEffect, useState } from 'react';
import Post from '../Components/Post';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
    
  const [posts,setPosts]=useState(null);
  const [concerts,setConcerts]=useState([]);
  const [selectedConcert, setSelectedConcert] = useState(null);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch('https://yourconcert-api.onrender.com/post', {
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

      const fetchConcerts = async () => {
        try {
          const response = await fetch('https://yourconcert-api.onrender.com/concerts');
          if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`);
          }
          const res = await response.json();
          setConcerts(res);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      fetchPosts();
      fetchConcerts();
    }, []);

    if (!posts) {
      return (
        <div className="flex items-center justify-center h-screen bg-blue-500">
          <div className="text-center font-bold text-3xl text-white">⌛</div>
        </div>
      );
    }

    const handleSlideClick = (concert) => {
      setSelectedConcert(concert);
    };

    const closeModal = () => {
      setSelectedConcert(null);
    };

  return (
    <div className='flex flex-col items-center mt-16 p-5'>
      <div className="w-full max-w-2xl ml-5 mr-5 lg:ml-0 lg:mr-0 md:ml-0 md:mr-0 pb-5">
        {posts.length > 0 && posts.map((post,index) => (
          <Post
            key={index}
            {...post}
          />
        ))}
      </div>
      <h1 className='text-2xl mt-5 font-bold text-center'>Upcoming Concerts</h1>
<div className="lg:w-1/4 md:w-1/2 w-full flex justify-center max-w-2xl mt-10 mb-5 p-5 rounded-xl bg-blue-400 shadow-lg">
  <Swiper
    slidesPerView={1}
    loop={true}
    navigation
  >
    {concerts.length > 0 && concerts.map((concert, index) => (
      <SwiperSlide
        key={index}
        className="flex flex-col justify-center items-center h-96 cursor-pointer"
        onClick={()=>handleSlideClick(concert)}
        >
        <p className='text-center font-bold text-2xl mb-5'>{concert.title}</p>
        <img className="object-contain lg:h-64 md:h-64 sm:h-64 w-full rounded-lg" src={`http://localhost:4000/${concert.cover}`} alt={`Concert`} />
      </SwiperSlide>
    ))}
  </Swiper>

  {selectedConcert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-blue-300 p-8 rounded-lg shadow-lg w-11/12 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">{selectedConcert.title}</h2>
            <img className="object-contain h-64 w-full rounded-lg mb-4" src={`https://yourconcert-api.onrender.com/${selectedConcert.cover}`} alt={`Concert ${selectedConcert.title}`} />
            <p className="mb-4">{selectedConcert.date}</p>
            <p className="mb-4">{selectedConcert.location}</p>
            <p className="mb-4">{selectedConcert.artist}</p>
            {new Date(selectedConcert.date).toLocaleString()}
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    
</div>


    </div>
  )
}

export default Home
