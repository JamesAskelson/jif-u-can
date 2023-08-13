import { Link } from "react-router-dom"
import PostCard from "../PostCard"

export default function UserPosts({ posts }){

    return (
        <div id='user-posts'>
            <div id='user-posts-nav-container'>
                ALL PUBLIC HIDDEN
            </div>
            <div id='user-posts-container'>
                {posts.map((post) =>(
                    <Link to={`/posts/${post.id}`} title={post.title}>
                        <PostCard post={post} key={post.id} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
