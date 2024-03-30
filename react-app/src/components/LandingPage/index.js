import { useEffect, useState } from "react";
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
    const [search, setSearch] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([]);
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

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const handleFilterPosts = (e) => {
        e.preventDefault();
        const filtered = publicPosts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
        setFilteredPosts(filtered.length > 0 ? filtered : []);
    };

    useEffect(() => {
        if(filteredPosts.length < 1){
            setFilteredPosts(publicPosts)
        }
        if(filteredPosts.length < 1 && search.trim() === ''){
            setFilteredPosts(publicPosts);
        }
        if(filteredPosts.length < 1 && search.length === 0){
            setFilteredPosts(publicPosts);
        }
    }, [publicPosts]);

    const handlePostsReset = (e) => {
        e.preventDefault()
        setSearch('');
        setFilteredPosts(publicPosts)
    }

    useEffect(() => {
        dispatch(getAllPostsThunk());
        dispatch(getCommentsThunk());
        dispatch(getAllTagsThunk());
    }, [dispatch]);


    return (
        <div id='landing-page-container'>
                <div id='search-bar'>
                    <input
                        placeholder="Search for what YOU want!"
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleFilterPosts}>
                        <img
                            src='https://s.imgur.com/desktop-assets/desktop-assets/icon-search.3bca12abe700ae5ca910.svg'
                        />
                    </button>
                </div>
                <div id='reset-button'>
                    <button onClick={handlePostsReset}>
                        Reset
                    </button>
                </div>

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
                {filteredPosts?.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()).map((post) => (
                    <Link onClick={goToTop} to={`/posts/${post.id}`} title={post.title}>
                        <PostCard post={post} key={post.id} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
