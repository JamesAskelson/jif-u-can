import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import UserPosts from "./UserPosts"
import UserComments from "./UserComments"


export default function UserProfile() {
    const sessionUser = useSelector((store) => store.session.user)
    // const dispatch = useDispatch()
    const history = useHistory()
    const [view, setView] = useState("posts");

    // useEffect(() => {
    //     // MEGATHUNKADONK
    //     if (!Object.values(posts).length) {
    //       async function fetchData() {
    //         await dispatch(getAllPostsThunk());
    //       }
    //       fetchData();
    //     }
    //   }, [dispatch]);

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
            {view === "posts" && <UserPosts posts={sessionUser.user_posts} />}
            {/* {view === "favorites" && <Favorites />} */}
            {view === "comments" && <UserComments />}
        </div>
    )
}
