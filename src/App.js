import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreatePost from './Pages/CreatePost';
import PostPage from './Pages/PostPage';
import EditPost from './Pages/EditPost';
import DeletePost from './Pages/DeletePost';
import { UserContextProvider } from './UserContext';
import Search from './Pages/Search';

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
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/delete/:id" element={<DeletePost />} />
            <Route path="/search" element={<Search />}/>
          </Routes>
        </Router>
    </div>
  </UserContextProvider>
  );
}

export default App;
