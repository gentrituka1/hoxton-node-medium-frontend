import React, { useState } from 'react'
import './SinglePost.css'
import { Post } from './Posts'

type User = {
    id: number
    name: string
    email: string
    posts: Post[]
}



export default function SinglePost() {

  const [post, setPost] = useState<Post | null>(null)
  const [users, setUsers] = useState<User[]>([])

  return (
    <main className='main'>
      <h4>Insights</h4>

    </main>
  )
}
