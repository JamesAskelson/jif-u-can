import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostCard from "../PostCard";
import { Link } from "react-router-dom";


export default function TagPosts() {
    const dispatch = useDispatch()
    const { id } = useParams();
    const postsData = useSelector((store) => store.posts)
    const posts = Object.values(postsData)
    const tagsData = useSelector((store) => store.tags)
    const tag = tagsData[id];
    const tagPosts = posts.filter((post) => post.tag_id === tag.id)
    console.log(posts)
    console.log('tag', tag)
    console.log("tagposts", tagPosts)
    return (
            <div id=''>
                <div>
                    <h1>
                        {tag.title}
                    </h1>
                    <h3>
                        {tag.tagline}
                    </h3>
                </div>
                <div>
                    {tagPosts?.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()).map((post) => (
                        <Link to={`/posts/${post.id}`} title={post.title}>
                            <PostCard post={post} key={post.id} />
                        </Link>
                    ))}
                </div>
            </div>
    )
}
