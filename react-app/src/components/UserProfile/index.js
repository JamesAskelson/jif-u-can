import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import UserPosts from "./UserPosts"
import UserComments from "./UserComments"
import { getAllPostsThunk } from "../../store/posts"
import { getUserCommentsThunk } from "../../store/comments"



export default function UserProfile() {
    const sessionUser = useSelector((store) => store.session.user);
    const posts = useSelector((store) => store.posts);
    const postsArr = Object.values(posts);
    const userPosts = postsArr.filter(post => post.user_id === sessionUser.id);
    const userComments = useSelector((store) => store.comments)
    console.log('comments', userComments)
    const dispatch = useDispatch();
    const history = useHistory();
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
        <div>
            <h1>
                {sessionUser.username}
            </h1>
            <div id="switch-view-container">
                <button onClick={() => handleView("posts")}>Posts</button>
                {/* <button onClick={() => handleView("favorites")}>Favorites</button> */}
                <button onClick={() => handleView("comments")}>Comments</button>
            </div>
            {view === "posts" && <UserPosts posts={userPosts} />}
            {/* {view === "favorites" && <Favorites />} */}
            {view === "comments" && <UserComments posts={postsArr} comments={userComments}/>}
        </div>
    )
}
