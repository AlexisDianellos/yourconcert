import React, { useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {Navigate} from 'react-router-dom';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [performanceQuality, setPerformanceQuality] = useState(1);
  const [pqComments, setPqComments]=useState('');
  const [stagePresence, setStagePresence] = useState(1);
  const [spComments, setSpComments]=useState('');
  const [soundQuality, setSoundQuality] = useState(1);
  const [sqComments, setSqComments]=useState('');
  const [visualEffects, setVisualEffects] = useState(1);
  const [veComments, setVeComments]=useState('');
  const [audienceInteraction, setAudienceInteraction] = useState(1);
  const [aiComments, setAiComments]=useState('');
  const [content, setContent] = useState('');
  const [redirect,setRedirect] = useState(false);
  const [errm, setErrm] = useState('');

  const handleSubmit = async(event) => {
    alert('Form submission started'); 
    event.preventDefault();

   if (!title || !summary || !files || !performanceQuality || !pqComments || 
      !stagePresence || !spComments || !soundQuality || !sqComments || 
      !visualEffects || !veComments || !audienceInteraction || !aiComments || 
      !content) {
    alert('Please fill in all fields');
    return;
  }
    
    const data = new FormData();//object for my 4 things
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.set('file', files[0]);//1st file
    data.set('performanceQuality', performanceQuality);
    data.set('pqComments', pqComments);
    data.set('stagePresence', stagePresence);
    data.set('spComments', spComments);
    data.set('soundQuality', soundQuality);
    data.set('sqComments', sqComments);
    data.set('visualEffects', visualEffects);
    data.set('veComments', veComments);
    data.set('audienceInteraction', audienceInteraction);
    data.set('aiComments', aiComments);

    alert('FormData is set');
    //when create post is clicked i want to send my 4 things to backend
    try{
    const response = await fetch('https://yourconcert-api.onrender.com/posts',{
      method:'POST',//bc im posting a new entry
      body: data,
      credentials: 'include',
    });
    alert('Fetch request sent');
    console.log('Create Post response:', response);
    if (response.ok) {
      alert('Post created successfully');
      setRedirect(true);
    } else {
          // Log additional details about the response
          const responseText = await response.text();
          console.error('Create Post failed:', {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            body: responseText,
          });
    
          let errorMessage = `Error: ${response.status} - ${response.statusText || 'No status text'}`;
          errorMessage += `\nResponse Body: ${responseText}`;
    
          setErrm(errorMessage);
          alert(errorMessage);
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      alert('Request timed out. Please try again.');
    } else {
      alert(`Error submitting post: ${err.message}`);
    }
  }
}


  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className="max-w-xl mx-auto p-5 mt-32 mb-10">
      <h1 className='text-center text-3xl font-bold mb-10'>Create a Concert review,</h1>
      <form onSubmit={handleSubmit} className="space-y-10">
        <div>
          <label type="title" className="block text-lg font-medium mt-5 lg:mt-0 md:mt-0">Concert Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title, artists, year, venue"
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
          />
        </div>
        <div>
          <label htmlFor="summary" className="block text-lg font-medium ">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows="4"
            placeholder="Enter summary"
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
          />
        </div>
        <div>
          <label className="block text-lg font-medium ">Upload Image</label>
          <input
            type="file"
            onChange={(e)=> setFiles(e.target.files)}
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black bg-white"
          />
        </div>
        
        <div>
        <label className="block text-lg font-medium ">Performance Quality</label>
          <select
            value={performanceQuality}
            onChange={(e) => setPerformanceQuality(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
          >
            <option value="" disabled>Select a rating</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <input
              value={pqComments}
              onChange={(e) => setPqComments(e.target.value)}
              type="text"
              placeholder='Artist’s performance'
              className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
            />
        </div>
        
        <div>
          <label className="block text-lg font-medium ">Stage Presence</label>
          <select
            value={stagePresence}
            onChange={(e) => setStagePresence(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
          >
            <option value="" disabled>Select a rating</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
            <input
              value={spComments}
              onChange={(e) => setSpComments(e.target.value)}
              type="text"
              placeholder='Interaction and stage presence'
              className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
            />
        </div>

        <div>
          <label className="block text-lg font-medium ">Sound Quality</label>
          <select
            value={soundQuality}
            onChange={(e) => setSoundQuality(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
          >
            <option value="" disabled>Select a rating</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
            <input
              value={sqComments}
              onChange={(e) => setSqComments(e.target.value)}
              type="text"
              placeholder='Audio quality'
              className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
            />
        </div>

        <div>
          <label className="block text-lg font-medium ">Visuals and Effects</label>
          <select
            value={visualEffects}
            onChange={(e) => setVisualEffects(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
          >
            <option value="" disabled>Select a rating</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
            <input
              value={veComments}
              onChange={(e) => setVeComments(e.target.value)}
              type="text"
              placeholder='Lighting, visuals, special effects'
              className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
            />
        </div>

        <div>
          <label className="block text-lg font-medium ">Audience Interaction</label>
          <select
            value={audienceInteraction}
            onChange={(e) => setAudienceInteraction(e.target.value)}
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
          >
            <option value="" disabled>Select a rating</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
            <input
              value={aiComments}
              onChange={(e) => setAiComments(e.target.value)}
              type="text"
              placeholder='Engagement with the audience'
              className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
            />
        </div>
        
          <p className='text-center text-xl font-bold'>Review</p>
            <ReactQuill
              value={content}
              modules={modules}
              formats={formats}
              onChange={(newValue) => setContent(newValue)}
              className='bg-white text-black'
              />

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600"
        >
          Create Review
        </button>
      </form>
      {errm && <pre className="mt-5 text-sm text-red-500">{errm}</pre>}
    </div>
  );
}

export default CreatePost;
