import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";

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
        <main className="main">
            <h2>Posts</h2>
            <ul>
                {posts.map(post => 
                    <Link to={`/posts/${post.id}`}>
                    <li id="item" key={post.id}>
                        <img src={post.image} alt={post.title} width={1000}/>
                        <div>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                        <div>
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
                            }}>Like</button>
                            <h2>{getAllLikes(post.id)}</h2>
                            <button onClick={() => {
                                navigate(`/posts/${post.id}`)
                            }}>Comment</button>
                            <h2>{getAllComments(post.id)}</h2>
                        </div>
                    </li>
                    </Link>
                )}
            </ul>
        </main>
  )
}