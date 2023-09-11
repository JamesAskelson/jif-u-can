import { Link } from "react-router-dom"
import PostCard from "../PostCard";
import './UserFavs.css';

export default function UserFavs({ posts }){

    return (
        <div id='user-favs'>
            <div id='user-favs-nav-container'>
                All Favorites
            </div>
            <div id='user-favs-container'>
                {posts.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()).map((post) =>(
                    <Link to={`/posts/${post.id}`} title={post.title}>
                        <PostCard post={post} key={post.id} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
