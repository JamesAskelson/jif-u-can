import { Link } from "react-router-dom"
import PostCard from "../PostCard"
import './UserPosts.css'

export default function UserPosts({ posts }){

    return (
        <div id='user-posts'>
            <div id='user-posts-nav-container'>
                ALL
            </div>
            <div id='user-posts-container'>
                {posts.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()).map((post) =>(
                    <Link to={`/posts/${post.id}`} title={post.title}>
                        <PostCard post={post} key={post.id} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
