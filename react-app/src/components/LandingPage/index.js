import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostsThunk } from "../../store/posts";
import { Link } from "react-router-dom";
import PostCard from "../PostCard";
import { getUserCommentsThunk } from "../../store/comments";
import { getAllTagsThunk } from "../../store/tags";
import TagCard from "./TagCard";
import './LandingPage.css'

export default function Landing() {
    const dispatch = useDispatch();
    const postsData = useSelector((store) => store.posts)
    const tagsData = useSelector((store) => store.tags)
    const tags = Object.values(tagsData)
    const posts = Object.values(postsData)

    useEffect(() => {
        // MEGATHUNKADONK
        if (!Object.values(postsData).length || !Object.values(tagsData).length) {
          async function fetchData() {
            await dispatch(getAllPostsThunk());
            await dispatch(getUserCommentsThunk());
            await dispatch(getAllTagsThunk());
          }
          fetchData();
        }
      }, [dispatch]);

    return (
        <div>
            <div id='tags-container'>
                {tags?.map((tag) => (
                    <TagCard id='tag-card-css' tag={ tag } key={ tag.id } />
                ))}
            </div>
            <div id='posts-container'>
                {posts?.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()).map((post) => (
                    <Link to={`/posts/${post.id}`} title={post.title}>
                        <PostCard post={post} key={post.id} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
