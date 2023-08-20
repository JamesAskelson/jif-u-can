import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteCommentThunk, getAllPostsThunk } from "../../store/posts";
import { useEffect } from "react";
import OpenModalButton from '../OpenModalButton';
import EditPostModal from "../EditPostModal";
import DeletePostModal from "../DeletePostModal";
import AddCommentForm from "./addCommentForm";
import EditCommentModal from "../EditCommentModal";
import PostComments from "./postComments";
import './PostDetails.css'
import PostCard from "../PostCard";
import { Link } from "react-router-dom";

export default function PostDetails() {
    const history = useHistory();
    const dispatch = useDispatch();
    let { id } = useParams();
    id = parseInt(id);
    const sessionUser = useSelector((store) => store.session.user);
    const postsData = useSelector((store) => store.posts);
    const posts = Object.values(postsData)
    const publicPosts = posts.filter(post => post.hidden === false)
    const post = postsData[id];
    const photos = post?.post_graphic;
    const comments = post?.post_comments
    console.log('post', post)
    console.log('comments', comments)

    const postDate = new Date(post?.created_date)
    const currentDate = new Date()
    const timeDifference = currentDate.getTime() - postDate.getTime()
    const dayDiff = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    console.log(dayDiff)

    console.log('user info', post?.user)


    const goToTop = () => {
        window.scrollTo({
            top: 0
        });
    }

    useEffect(() => {
        // MEGATHUNKADONK
        if (!Object.values(postsData).length || !Object.values(post).length) {
          async function fetchData() {
            await dispatch(getAllPostsThunk());
          }
          fetchData();
        }
      }, [dispatch]);

    if (!post) return <></>;

    return (
        <div id='post-details-outer'>
            <h3 onClick={() => history.goBack()} id="breadcrumb">
                {"< Go Back"}
            </h3>
            <div id='post-details'>
                <div id='post-details-main-container'>
                    <div id='post-details-title-user'>
                        <div>
                            <h2>
                                {post.title}
                            </h2>
                        </div>
                            <div id='post-detail-user'>
                                <span>{post?.user?.username}</span>
                                <div>
                                    {dayDiff === 0 ? "Today" : `${dayDiff} days ago`}
                                </div>
                            </div>
                    </div>
                    <div id='post-details-img'>
                        <img
                        alt='post'
                        src={photos[0].url}
                        title={post.title}
                        />
                    </div>
                    <div id='post-description-container'>
                        <p>
                            {post.description}
                        </p>
                    </div>
                    <div id='edit-delete-post-container'>
                        {sessionUser && sessionUser.id === post.user_id &&
                        <div id='edit-button-container'>
                            <OpenModalButton
                               className="edit-modal-button"
                               buttonText="Edit Post"
                               modalComponent={<EditPostModal user={sessionUser} post={post}/>}
                           />
                        </div>}

                        {sessionUser && sessionUser.id === post.user_id &&
                        <div id='delete-button-container'>
                            <OpenModalButton
                                className="delete-modal-button"
                                buttonText="Delete Post"
                                modalComponent={<DeletePostModal post={post}/>}
                            />
                        </div>}
                    </div>
                </div>
                <div id='post-comments-whole-container'>
                    {sessionUser && <AddCommentForm user={sessionUser} post={post}/>}
                    <div id='post-num-comments'>
                        {comments?.length} Comments
                    </div>
                    <hr id='comments-hr'/>
                    <div id='post-comments-container'>
                        {comments.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()).map((comment) => (
                            <PostComments comment={comment} post={post} sessionUser={sessionUser}/>
                        ))}
                    </div>
                </div>
            </div>
            <div id='explore-posts-text'>
                EXPLORE POSTS
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
