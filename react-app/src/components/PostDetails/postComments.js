import { useDispatch} from "react-redux";
import {  getAllPostsThunk } from "../../store/posts";
import EditCommentModal from "../EditCommentModal";
import OpenModalButton from "../OpenModalButton";
import './postComments.css'
import { useEffect } from "react";
import { getUsersThunk } from "../../store/session";
import { deleteCommentThunk } from "../../store/comments";

export default function PostComments ({ comment, post, sessionUser, users }) {
    const dispatch = useDispatch();
    const commentDate = new Date(comment?.created_date)
    const currentDate = new Date()
    const timeDifference = Math.floor(( currentDate - commentDate ) / 1000)
    const user = users?.find(user => user?.id === comment?.user_id)

    let timeAgo = "";
    if(timeDifference < 60) {
        timeAgo = 'Just now'
    } else if (timeDifference < 3600) {
        const mins = Math.floor(timeDifference / 60);
        timeAgo = `${mins} ${mins === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifference < 86400) {
        const hours = Math.floor(timeDifference / 3600);
        timeAgo = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifference < 2592000) {
        const days = Math.floor(timeDifference / 86400);
        timeAgo = `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (timeDifference < 31536000) {
        const months = Math.floor(timeDifference / 2592000);
        timeAgo = `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
        const years = Math.floor(timeDifference / 31536000);
        timeAgo = `${years} ${years === 1 ? "year" : "years"} ago`;
    }

    return (
        <div>
            <div id='post-comment'>
                <div id='comment-username-date'>
                    <div id='comment-username'>
                        {user?.username}
                    </div>
                    <div>
                    • {timeAgo}
                    </div>

                </div>
                <div id='comment-text'>
                    {comment?.text && comment?.text}
                </div>
                <div id='comment-img-container'>
                    {comment?.url && <img
                    className="comment-img"
                    src={comment.url}
                    />}
                </div>
                <div id='comment-buttons'>
                    {sessionUser && sessionUser.id === comment.user_id && <OpenModalButton
                        className="edit-modal-button"
                        buttonText="Edit"
                        modalComponent={<EditCommentModal post={post} user={sessionUser} comment={comment}/>}
                    />}
                    {sessionUser && sessionUser?.id === comment?.user_id &&
                    <button
                        onClick={() => {
                            dispatch(deleteCommentThunk(comment.id));
                        }}
                    >
                        Delete
                    </button>}
                </div>

            </div>
            <hr id='comments-hr'/>
        </div>
    )
}
