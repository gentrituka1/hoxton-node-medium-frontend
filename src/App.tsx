import './App.css'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Like, Post, Posts, Comment } from './pages/Posts'
import SinglePost from './pages/SinglePost'
import { useState } from 'react';

function App() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  return (
    <div className="App">
      <header className='header'>
        <Link className='h1' to="/posts">Blogpost</Link>
        <div>
          <Link className='link' to="/posts">Posts</Link>
        </div>
      </header>
      <main className='main'>
          <Routes>
            <Route index element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<SinglePost />} />
          </Routes>
      </main>
    </div>
  )
}

export default App
