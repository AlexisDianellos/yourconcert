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
  const [performanceQuality, setPerformanceQuality] = useState(null);
  const [pqComments, setPqComments]=useState('');
  const [stagePresence, setStagePresence] = useState(null);
  const [spComments, setSpComments]=useState('');
  const [soundQuality, setSoundQuality] = useState(null);
  const [sqComments, setSqComments]=useState('');
  const [visualEffects, setVisualEffects] = useState(null);
  const [veComments, setVeComments]=useState('');
  const [audienceInteraction, setAudienceInteraction] = useState(null);
  const [aiComments, setAiComments]=useState('');
  const [content, setContent] = useState('');
  const [redirect,setRedirect] = useState(false);

  const handleSubmit = async(event) => {
   
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
    
    //when create post is clicked i want to send my 4 things to backend
    const response = await fetch('https://yourconcert-api.onrender.com/post',{
      method:'POST',//bc im posting a new entry
      body: data,
      credentials: 'include',
    });
    if (response.ok){
      setRedirect(true);
    }
  };

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className="max-w-xl mx-auto p-5 mt-16 text-gray-400">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div>
          <label type="title" className="block text-sm font-medium  mt-5 lg:mt-0 md:mt-0">Concert Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title, artists, year, venue"
            className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900"
          />
        </div>
        <div>
          <label htmlFor="summary" className="block text-sm font-medium ">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows="4"
            placeholder="Enter summary"
            className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium ">Upload Image</label>
          <input
            type="file"
            onChange={(e)=> setFiles(e.target.files)}
            className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900"
          />
        </div>
        
        <div>
        <label className="block text-sm font-medium ">Performance Quality</label>
          <select
            value={performanceQuality}
            onChange={(e) => setPerformanceQuality(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900"
            />
        </div>
        
        <div>
          <label className="block text-sm font-medium ">Stage Presence</label>
          <select
            value={stagePresence}
            onChange={(e) => setStagePresence(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900"
            />
        </div>

        <div>
          <label className="block text-sm font-medium ">Sound Quality</label>
          <select
            value={soundQuality}
            onChange={(e) => setSoundQuality(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900"
            />
        </div>

        <div>
          <label className="block text-sm font-medium ">Visuals and Effects</label>
          <select
            value={visualEffects}
            onChange={(e) => setVisualEffects(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900"
            />
        </div>

        <div>
          <label className="block text-sm font-medium ">Audience Interaction</label>
          <select
            value={audienceInteraction}
            onChange={(e) => setAudienceInteraction(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900 "
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
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-900"
            />
        </div>
        
        <div>
          <p className=' ml-5 mr-5 mb-5 '>The analytical review covers the concert's performance, sound, setlist, stage presence, visuals, venue, and value. Highlights and improvements will also be discussed.</p>
          <ReactQuill
            value={content}
            modules={modules}
            formats={formats}
            onChange={(newValue) => setContent(newValue)}
            />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Review
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
