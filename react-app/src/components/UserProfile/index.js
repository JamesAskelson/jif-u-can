import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import UserPosts from "./UserPosts"
import UserComments from "./UserComments"
import { getAllPostsThunk } from "../../store/posts"
import { getUserCommentsThunk } from "../../store/comments"
import './UserProfile.css'


export default function UserProfile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((store) => store.session.user);
    if (!sessionUser) history.push("/")
    const posts = useSelector((store) => store.posts);
    const postsArr = Object.values(posts);
    const userPosts = postsArr.filter(post => post.user_id === sessionUser.id);
    const userComments = useSelector((store) => store.comments)
    console.log('comments', userComments)
    const [view, setView] = useState("posts");

    useEffect(() => {
        // MEGATHUNKADONK
        if (!Object.values(posts).length || !Object.values(userComments).length) {
          async function fetchData() {
            await dispatch(getAllPostsThunk());
            await dispatch(getUserCommentsThunk());
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
                    {/* <button onClick={() => handleView("favorites")}>Favorites</button> */}
                    <button className={view === "comments" ? "active" : ""} onClick={() => handleView("comments")}>Comments</button>
                </div>
            </div>
            {view === "posts" && <UserPosts posts={userPosts} />}
            {/* {view === "favorites" && <Favorites />} */}
            {view === "comments" && <UserComments user={sessionUser} posts={postsArr} comments={userComments}/>}
        </div>
    )
}
