import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PostPage = () => {
  
  const [post,setPost]=useState(null);
  const {id} = useParams();//id of each post that it gets from the url
  const [overallRating, setOverallRating] = useState(null);

useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPost(postInfo);
        });
      });
  }, []);

  const calcualteOverallRating = () =>{
    const performanceQuality = parseFloat(post.performanceQuality)||0;
    const stagePresence = parseFloat(post.stagePresence)||0;
    const soundQuality = parseFloat(post.soundQuality)||0;
    const visualEffects = parseFloat(post.visualEffects)||0;
    const audienceInteraction = parseFloat(post.audienceInteraction)||0;

    const sum=(performanceQuality+stagePresence+soundQuality+visualEffects+audienceInteraction)/5
    return sum.toFixed(1);
  };

  const getRatingColor = (rating) => {
    if (rating >= 8.5) {
      return 'text-green-900'; // Bright green
    } else if (rating >= 7) {
      return 'text-green-500'; // Green
    } else if (rating >= 5) {
      return 'text-yellow-500'; // Yellow
    } else if (rating >= 3) {
      return 'text-orange-700'; // Orange
    } else {
      return 'text-red-900'; // Red
    }
  };
  
  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-500">
        <div className="text-center font-bold text-3xl text-white">⌛</div>
      </div>
    );
  }
  
  return (
    <div className="max-w-xl mx-auto p-5 pt-24">
    <Link className="font-bold material-symbols-outlined mb-5" to="/">
      arrow_back
    </Link>
    <h1 className="text-2xl font-bold mb-8 text-center">{post.title}</h1>
    <div className="mb-5">
      <img src={`http://localhost:4000/${post.cover}`} alt={post.title} className="w-full h-auto object-cover rounded-md" />
    </div>
    <div className='flex justify-center'>
      <hr className="w-full border-t border-gray-300 my-4 " />
    </div>
      <div className="text-xl space-y-6 mt-5">
        <div className='text-center font-semibold text-2xl'>Overall Rating:
        <p className={`font-bold ${getRatingColor(calcualteOverallRating())}`}>{calcualteOverallRating()}</p>
        <div className='flex justify-center mt-5'>
          <hr className="w-full border-t border-gray-300 my-4 " />
        </div>
        </div>
        <div>
          <div>
            <div className="font-semibold mb-1">Performance Quality:&nbsp;
              <span className={getRatingColor(post.performanceQuality)}>
                {post.performanceQuality}/10
              </span>
            </div>
            <p className=" mb-5 pl-2">• {post.pqComments}</p>
          </div>
          <div>
            <div className="font-semibold  mb-1">Stage Presence:&nbsp;
              <span className={getRatingColor(post.stagePresence)}>
                {post.stagePresence}/10
              </span>
            </div>
            <p className=" mb-5 pl-2">• {post.spComments}</p>
          </div>
          <div>
            <div className="font-semibold  mb-1">Sound Quality:&nbsp;
              <span className={getRatingColor(post.soundQuality)}>
                {post.soundQuality}/10
              </span>
            </div>
            <p className=" mb-5 pl-2">• {post.sqComments}</p>
          </div>
          <div>
            <div className="font-semibold  mb-1">Visual Effects:&nbsp;
              <span className={getRatingColor(post.visualEffects)}>
                {post.visualEffects}/10
              </span>
            </div>
            <p className=" mb-5 pl-2">• {post.veComments}</p>
          </div>
          <div>
            <div className="font-semibold  mb-1">Audience Interaction:&nbsp;
              <span className={getRatingColor(post.audienceInteraction)}>
                {post.audienceInteraction}/10
              </span>
            </div>
            <p className=" mb-5 pl-2">• {post.aiComments}</p>
          </div>
        </div>
      </div>
    <div className='flex justify-center mt-10'>
      <hr className="w-full border-t border-gray-300 my-4 " />
    </div>
    <p className='text-2xl font-semibold text-center mb-5 mt-5'>Review</p>
    <div className='flex justify-center mb-10'>
      <hr className="w-full border-t border-gray-300 my-4 " />
    </div>
    <div className="max-w-none text-l lg:text-xl md:text-xl" dangerouslySetInnerHTML={{ __html: post.content }}></div>
    <div className="flex flex-col items-end mt-14 text-gray-300">
      <p>Review by {post.author.username}</p>
      <p>Created at {new Date(post.createdAt).toLocaleString()}</p>
    </div>
  </div>
  )
}

export default PostPage
