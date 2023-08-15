import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteCommentThunk, getAllPostsThunk } from "../../store/posts";
import { useEffect } from "react";
import OpenModalButton from '../OpenModalButton';
import EditPostModal from "../EditPostModal";
import DeletePostModal from "../DeletePostModal";
import AddCommentForm from "./addCommentForm";
import EditCommentModal from "../EditCommentModal";


export default function PostDetails() {
    const history = useHistory();
    const dispatch = useDispatch();
    let { id } = useParams();
    id = parseInt(id);
    const sessionUser = useSelector((store) => store.session.user);
    const posts = useSelector((store) => store.posts);
    const post = posts[id];
    const photos = post?.post_graphic;
    const comments = post?.post_comments
    console.log('post', post)
    console.log('comments', comments)


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
                <p>
                    {post.user.username}
                </p>
                <img
                alt='post'
                src={photos[0].url}
                title={post.title}
                />
                <p>
                    {post.description}
                </p>
                <div id='edit-delete-post-container'>
                    {sessionUser && sessionUser.id === post.user_id && <OpenModalButton
						className="edit-modal-button"
						buttonText="Edit Post"
						modalComponent={<EditPostModal user={sessionUser} post={post}/>}
					/>}
                    {sessionUser && sessionUser.id === post.user_id && <OpenModalButton
						className="delete-modal-button"
						buttonText="Delete Post"
						modalComponent={<DeletePostModal post={post}/>}
					/>}
                </div>
            </div>
            <div>
                {sessionUser && <AddCommentForm user={sessionUser} post={post}/>}
            </div>
            <div id='post-comments-container'>
                <p>{comments?.length} Comments</p>
                {comments?.map((comment) => (
                    <div>
                        <div>
                            {comment.user.username}
                        </div>
                        <div>
                            {comment.text}
                        </div>
                        <div>
                            {sessionUser && sessionUser.id === comment.user_id && <OpenModalButton
                                className="edit-modal-button"
                                buttonText="Edit"
                                modalComponent={<EditCommentModal post={post} user={sessionUser} comment={comment}/>}
                            />}
                            {sessionUser && sessionUser.id === comment.user_id &&
                            <button
                                onClick={() => {
                                    dispatch(deleteCommentThunk(post.id, comment.id));
                                }}
                            >
                                Delete
                            </button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
