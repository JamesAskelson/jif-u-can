import { useDispatch } from "react-redux";
import { deleteCommentThunk } from "../../store/posts";
import EditCommentModal from "../EditCommentModal";
import OpenModalButton from "../OpenModalButton";


export default function PostComments ({ comment, post, sessionUser }) {
    const dispatch = useDispatch();
    const commentDate = new Date(comment?.created_date)
    const currentDate = new Date()
    const timeDifference = currentDate.getTime() - commentDate.getTime()
    const dayDiff = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    console.log(dayDiff)

    return (
        <div>
            <div>
                {comment.user?.username} • {dayDiff === 0 ? "Today" : `${dayDiff} days ago`}
            </div>
            <div>
                {comment?.text}
            </div>
                <div>
                {sessionUser && sessionUser.id === comment.user_id && <OpenModalButton
                    className="edit-modal-button"
                    buttonText="Edit"
                    modalComponent={<EditCommentModal post={post} user={sessionUser} comment={comment}/>}
                />}
                {sessionUser && sessionUser?.id === comment?.user_id &&
                <button
                    onClick={() => {
                        dispatch(deleteCommentThunk(post.id, comment.id));
                    }}
                >
                    Delete
                </button>}
            </div>
        </div>
    )
}
