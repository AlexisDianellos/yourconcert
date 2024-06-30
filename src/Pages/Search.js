import React,{useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
import Post from '../Components/Post';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`https://yourconcert-api.onrender.com/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);
  
  return (
    <div className='flex flex-col items-center mt-16 p-5'>
      <p>Search results for "{query}"</p>
      <div className="w-full max-w-2xl ml-5 mr-5 lg:ml-0 lg:mr-0 md:ml-0 md:mr-0 pb-5">
        {searchResults.length > 0 && searchResults.map((searchResults,index) => (
          <Post
            key={index}
            {...searchResults}
          />
        ))}
      </div>
      </div>
  )
}

export default Search