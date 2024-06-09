import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreatePost from './Pages/CreatePost';
import PostPage from './Pages/PostPage';
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <div className='bg-blue-500 text-white'>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />}/>
          </Routes>
        </Router>
    </div>
  </UserContextProvider>
  );
}

export default App;
