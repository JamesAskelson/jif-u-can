import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostCard from "../PostCard";
import { Link } from "react-router-dom";
import './TagPosts.css'
import { getAllTagsThunk } from "../../store/tags";
import { getAllPostsThunk } from "../../store/posts";

export default function TagPosts() {
    const dispatch = useDispatch()
    const { id } = useParams();
    const postsData = useSelector((store) => store.posts)
    const posts = Object.values(postsData)
    const tagsData = useSelector((store) => store.tags)
    const tag = tagsData[id];
    console.log('posts', posts)
    console.log('tag', tag)
    console.log()
    const tagPosts = posts.filter((post) => post.tag_id === tag?.id)


    useEffect(() => {
        // MEGATHUNKADONK
        if (!Object.values(postsData).length || !Object.values(tagsData).length) {
          async function fetchData() {
            await dispatch(getAllPostsThunk());
            await dispatch(getAllTagsThunk());
          }
          fetchData();
        }
      }, [dispatch]);

    return (
            <div id='tag-page-container'>
                <div id='tag-info'>
                    <div id='tag-title-container'>
                        <h1>{tag?.title}</h1>
                    </div>
                    <div id='tag-tagline-container'>
                        <h3>{tag?.tagline}</h3>
                    </div>
                    <div id='tag-posts-length'>
                        <p>{tagPosts?.length} POSTS</p>
                    </div>
                </div>
                <div id='posts-container'>
                    {tagPosts?.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()).map((post) => (
                        <Link to={`/posts/${post.id}`} title={post.title}>
                            <PostCard post={post} key={post.id} />
                        </Link>
                    ))}
                </div>
            </div>
    )
}
