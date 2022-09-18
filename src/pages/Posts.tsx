import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Posts.css"
import {BsFillHeartFill} from 'react-icons/bs'
import {BiCommentDetail} from 'react-icons/bi'

type Post = {
    id: number;
    title: string;
    content?: string;
    image?: string;
    published: boolean;
    liked: boolean;
    likes: [];
    comments: [];
}

type Like = {
    id: number;
    postId: number;
}

type Comment = {
    id: number;
    content: string;
    postId: number;
}

export function Posts() {
    const [posts, setPosts] = useState<Post[]>([])
    const [likes, setLikes] = useState<Like[]>([])
    const [comments, setComments] = useState<Comment[]>([])
    const [showComments, setShowComments] = useState<boolean>(false)

    let params = useParams()

    let navigate = useNavigate()
    
    useEffect(() => {
        fetch('http://localhost:5000/posts')
            .then(res => res.json())
            .then(postsFromServer => setPosts(postsFromServer))
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/likes')
            .then(res => res.json())
            .then(likesFromServer => setLikes(likesFromServer))
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/comments')
            .then(res => res.json())
            .then(commentsFromServer => setComments(commentsFromServer))
    }, [])

    function getAllLikes(postId: number) {
        let numberOfLikes = likes.filter(like => like.postId === postId)
        return numberOfLikes.length
    }

    function getAllComments(postId: number) {
        let numberOfComments = comments.filter(comment => comment.postId === postId)
        return numberOfComments.length
    }

  return (
        <main className="posts">
            <h2 className="h2">Posts</h2>
            <ul className="posts-list">
                {posts.map(post => 
                    <li id="posts-list-item" key={post.id}>
                        <Link className="posts-links" to={`/posts/${post.id}`}>
                            <img src={post.image} alt={post.title} width={1000}/>
                            <div className="posts-content">
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                        </Link>
                        <div className="posts-likes-and-comments">
                            <div className="posts-likes button">
                                <button onClick={() => {
                                    // when the button is pressed, we want to add a like to this post

                                    // 1. create a new like object
                                    const newLike = {
                                        id: likes.length + 1,
                                        postId: post.id
                                    }

                                    // 2. send the new like to the server
                                    fetch(`http://localhost:5000/posts/${post.id}/likes`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(newLike)
                                    }).then(res => res.json())
                                    .then(() => {
                                        // 3. update the likes state
                                        setLikes([...likes, newLike])
                                    })
                                }}><BsFillHeartFill className="icons like"/></button>
                                <h2>{getAllLikes(post.id)}</h2>
                            </div>
                            <div className="posts-comments button">
                                <button onClick={() => {
                                    navigate(`/posts/${post.id}`)
                                }}><BiCommentDetail className="icons comment" /></button>
                                <h2>{getAllComments(post.id)}</h2>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </main>
  )
}