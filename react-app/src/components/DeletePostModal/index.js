import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteExistingPost, getAllPostsThunk } from "../../store/posts"
import { useHistory } from "react-router-dom"
import './DeletePost.css'


export default function DeletePostModal({ post }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const handleDeletePost = async () => {
        return dispatch(deleteExistingPost(post.id))
        .then (() => dispatch(getAllPostsThunk()))
        .then (() => closeModal())
        .then (() => history.push('/'))
    }

    const handleCloseModal = () => {
        closeModal()
    }


    return (
        <div id="delete-post-modal-main-container">
            <div id="delete-post-modal-text">
                <div>
                    <h2>Confirm Delete</h2>
                </div>
                <hr id='delete-post-hr'/>
                <div id=''>
                    <div id='delete-post-modal-text-1'>
                        <h3>Are you sure you want to delete this post? </h3>
                    </div>
                    <div id='delete-post-modal-text-2'>
                        (Once you click yes, it is irreversable)
                    </div>
                </div>
            </div>
            <div id="delete-post-modal-buttons">
                <div>
                    <button onClick={handleDeletePost}>Delete this post</button>
                </div>
                <div>
                    <button onClick={handleCloseModal}>Keep post</button>
                </div>
            </div>
        </div>
    )
}
