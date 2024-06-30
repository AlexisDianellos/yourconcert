import React,{useEffect, useState} from 'react';
import {format, differenceInHours, differenceInMinutes } from "date-fns";
import { Link } from 'react-router-dom';

const Post = ({_id,title,summary,cover,content,createdAt,author}) => {

  const createdDate = new Date(createdAt);
  const now = new Date();
  const minutesDifference = differenceInMinutes(now, createdDate);
  const hoursDifference = differenceInHours(now, createdDate);

  let displayDate;
  if (minutesDifference < 1) {
    displayDate = 'just now';
  }else if (minutesDifference <2) {
    displayDate = `${minutesDifference} minute ago`;
  }
  else if (minutesDifference < 60) {
    displayDate = `${minutesDifference} minutes ago`;
  } else if (hoursDifference>=1 && hoursDifference<2) {
    displayDate = `${hoursDifference} hour ago`;
  } 
  else if (hoursDifference < 24) {
    displayDate = `${hoursDifference} hours ago`;
  } else {
    displayDate = format(createdDate, 'MMM dd, yyyy');
  }

  return (
    <div className='items-center p-1 cursor-pointer lg:w-3/5 md:w-3/5 sm:w-3/5 xs:w-full mx-auto mt-7'>{/*post*/}
      <Link to={`/post/${_id}`}>
        <div className='flex'>
          <p className='font-semibold mr-1'>{author.username}</p>
          <time className='text-gray-200'>• {displayDate}</time>
        </div>
        <h1 className='text-md font-semibold mt-1'>{title}</h1>
        <div className='flex justify-center'>
          <img src={'https://yourconcert-api.onrender.com/'+cover} className='w-full h-auto rounded-md object-cover mt-2 mb-2'></img>
        </div>
        <p className='text-md text-gray-200'>{summary}</p>
      </Link>
      <hr className="w-full border-t border-gray-300 mt-5" />
    </div>
  )
}

export default Post;
