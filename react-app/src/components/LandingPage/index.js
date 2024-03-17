import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostsThunk } from "../../store/posts";
import { Link } from "react-router-dom";
import PostCard from "../PostCard";
import { getAllTagsThunk } from "../../store/tags";
import TagCard from "./TagCard";
import './LandingPage.css'
import { getCommentsThunk } from "../../store/comments";

export default function Landing() {
    const dispatch = useDispatch();
    const postsData = useSelector((store) => store.posts)
    const tagsData = useSelector((store) => store.tags)
    const tags = Object.values(tagsData)
    const posts = Object.values(postsData)
    const publicPosts = posts.filter(post => post.hidden === false)

    const goToTop = () => {
        window.scrollTo({
            top: 0
        });
    }

    useEffect(() => {
        // MEGATHUNKADONK
        if (!Object.values(postsData).length || !Object.values(tagsData).length) {
          async function fetchData() {
            await dispatch(getAllPostsThunk());
            await dispatch(getCommentsThunk());
            await dispatch(getAllTagsThunk());
          }
          fetchData();
        }
      }, [dispatch]);

    return (
        <div id='landing-page-container'>
            <div id='tag-search-container'>
                <div id='explore-tags-text'>
                    <h3>
                        Explore Tags
                    </h3>
                </div>
                <div id='tags-container'>
                    {tags?.map((tag) => (
                        <TagCard id='tag-card-css' tag={ tag } key={ tag.id } />
                    ))}
                </div>
                {/* <div id='search-bar-container'>
                    <div id='search-bar'>
                        <input
                        placeholder="Search"
                        ></input>
                    </div>
                </div> */}
            </div>
            <div id='posts-container'>
                {publicPosts?.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()).map((post) => (
                    <Link onClick={goToTop} to={`/posts/${post.id}`} title={post.title}>
                        <PostCard post={post} key={post.id} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
