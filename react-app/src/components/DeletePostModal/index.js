import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteExistingPost, getAllPostsThunk } from "../../store/posts"
import { useHistory } from "react-router-dom"



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
            <div className="">
                <h2>Confirm Delete</h2>
                <h3>Are you sure you want to delete this post? Once you click yes, it is irreversable</h3>
                <div className="modal-buttons-container">
                    <button onClick={handleDeletePost}>Yes (Delete Post)</button>
                    <button onClick={handleCloseModal}>No</button>
                </div>
            </div>
        </div>
    )
}
