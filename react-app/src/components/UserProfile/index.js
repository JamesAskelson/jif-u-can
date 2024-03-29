import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import UserPosts from "./UserPosts"
import UserComments from "./UserComments"
import UserFavs from "./UserFavs"
import { getAllPostsThunk } from "../../store/posts"
import { getCommentsThunk } from "../../store/comments"
import { getAllUserFavs } from "../../store/favorites"
import './UserProfile.css'


export default function UserProfile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((store) => store.session.user);
    if (!sessionUser) history.push("/")
    const posts = useSelector((store) => store.posts);
    const postsArr = Object.values(posts);
    const userPosts = postsArr.filter(post => post.user_id === sessionUser.id);
    const comments = Object.values(useSelector((store) => store.comments))
    const userComments = comments.filter(comment => comment.user_id === sessionUser.id)
    const favs = useSelector((store) => store.favorites)
    const favsArr = Object.values(favs)
    const userFavPosts = postsArr.filter(post => favsArr.find(fav => fav.post_id === post.id));
    // console.log('lookin at dis', userFavPosts)
    const [view, setView] = useState("posts");

    useEffect(() => {
        // MEGATHUNKADONK
        if (!Object.values(posts).length || !Object.values(userComments).length || !Object.values(favs).length ) {
          async function fetchData() {
            await dispatch(getAllPostsThunk());
            await dispatch(getCommentsThunk());
            await dispatch(getAllUserFavs())
          }
          fetchData();
        }
      }, [dispatch]);

    const handleView = (view) => {
        setView(view);
    };


    if(!sessionUser) {
        history.push("/")
    }
    return (
        <div id='user-profile'>
            <div id='user-profile-main'>
                <div id='user-profile-title'>
                    <img
                    src='https://aws-starter-bucket123.s3.amazonaws.com/CD6nVjA.png'
                    alt='default user pfp'
                    />
                    <h1>
                        {sessionUser.username}
                    </h1>
                </div>
                <div id="switch-view-container">
                    <button className={view === "posts" ? "active" : ""} onClick={() => handleView("posts")}>Posts</button>
                    <button className={view === "favorites" ? "active" : ""} onClick={() => handleView("favorites")}>Favorites</button>
                    <button className={view === "comments" ? "active" : ""} onClick={() => handleView("comments")}>Comments</button>
                </div>
            </div>
            {view === "posts" && <UserPosts posts={userPosts} />}
            {view === "favorites" && <UserFavs user={sessionUser} posts={userFavPosts}/>}
            {view === "comments" && <UserComments user={sessionUser} posts={postsArr} comments={userComments}/>}
        </div>
    )
}
