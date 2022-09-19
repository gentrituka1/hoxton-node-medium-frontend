import React, { useEffect, useState } from 'react'
import './SinglePost.css'
import { Like, Post, Comment } from './Posts'
import { useNavigate, useParams } from 'react-router-dom'

type User = {
    id: number
    name: string
    email: string
    posts: Post[]
}


export default function SinglePost() {

  const [post, setPost] = useState<Post | null>(null)
  const [users, setUsers] = useState<User[]>([])

  let params = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:4000/posts/${params.id}`)
      .then((res) => res.json())
      .then((postFromServer) => setPost(postFromServer))
  }, [])

  useEffect(() => {
    fetch(`http://localhost:4000/users`)
      .then((res) => res.json())
      .then((userFromServer) => setUsers(userFromServer))
  }, [])

  if(!post) {
    return <div>Loading</div>
  }

  return (
    <main className='post-details'>
      <h4>Insights</h4>
      <div className='single-post'>
        <div className='single-post-details'>
          <h1>{post.title}</h1>
          {users.filter(user => user.id === post.userId).map(user => (
          <>
            <div className='user'>
              <h3>By: <b className='user-name'>{user.name}</b></h3>
              <h5>Email: {user.email}</h5>
            </div>
          </>
          ))}
        </div>
        <img src={post.image} alt={post.title} width={600} />
        <p>{post.content}</p>
      </div>
    </main>
  )
}
