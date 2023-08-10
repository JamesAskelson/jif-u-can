import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getAllPostsThunk } from "../../store/posts";
import { useEffect } from "react";

export default function PostDetails() {
    const history = useHistory();
    const dispatch = useDispatch()
    let { id } = useParams();
    id = parseInt(id);
    const user = useSelector((store) => store.session.user);
    console.log('user',user)
    const posts = useSelector((store) => store.posts);
    const post = posts[id]
    const photos = post?.post_graphic

    useEffect(() => {
        // MEGATHUNKADONK
        if (!Object.values(posts).length) {
          async function fetchData() {
            await dispatch(getAllPostsThunk());
          }
          fetchData();
        }
      }, [dispatch]);

    if (!post) return <></>;

    return (
        <div id='post-details'>
            <h3 onClick={() => history.goBack()} id="breadcrumb">
                {"< Go Back"}
            </h3>
            <div id='post-details-main-container'>
                <h2>
                    {post.title}
                </h2>
                <img
                alt='post'
                src={photos[0].url}
                title={post.title}
                />
                <p>
                    {post.description}
                </p>
            </div>

        </div>
    )
}
