import './App.css'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Posts } from './pages/Posts'
import Post from './pages/Post'

function App() {

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
            <Route path="/posts/:id" element={<Post />} />
          </Routes>
      </main>
    </div>
  )
}

export default App
