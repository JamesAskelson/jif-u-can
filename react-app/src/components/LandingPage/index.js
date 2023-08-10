import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostsThunk } from "../../store/posts";
import { Link } from "react-router-dom";
import PostCard from "../PostCard";


export default function Landing() {
    const dispatch = useDispatch();
    const postsData = useSelector((store) => store.posts)
    const posts = Object.values(postsData)

    useEffect(() => {
        // MEGATHUNKADONK
        if (!Object.values(postsData).length) {
          async function fetchData() {
            await dispatch(getAllPostsThunk());
          }
          fetchData();
        }
      }, [dispatch]);

    return (
        <div>
            <div id='tags-container'>
                Tags Container
            </div>
            <div id='posts-container'>
                {posts?.map((post) => (
                    <Link to={`/posts/${post.id}`} title={post.title}>
                        <PostCard post={post} key={post.id} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
