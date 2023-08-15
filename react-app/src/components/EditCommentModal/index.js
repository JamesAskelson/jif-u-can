import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editCommentThunk } from "../../store/posts";
import { useModal } from "../../context/Modal";



export default function EditCommentModal({ user, post, comment }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errorValidation, setErrorValidation] = useState({});
    const [text, setText] = useState(comment.text);
    const [url, setUrl] = useState(comment.url);

    useEffect(() => {
        errorChecking()
    }, [text])

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {
            user_id: user.id,
            post_id: post.id,
            text,
            url
        }
        console.log('comment', comment.id)
        dispatch(editCommentThunk(data, comment.id))
        reset()
        closeModal()
    }

    function reset() {
        setText("");
        setUrl("");
    }

    const errorChecking = () => {
        const errors = {}

        if(!text) errors.text = "Text is required"
        if(text.length > 255) errors.text = "Text must be less than 255 chars"

        setErrorValidation({...errors})
    }

    const urlCheck = (url) => {
        return (
          url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg") || url.endsWith(".gif")
        );
    };

    return (
        <div id='new-comments-form-container'>
            <form id='new-comment-form'>
                <div>
                    <textarea
                        id='new-comment-text-input'
                        placeholder="Write a comment"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        id='new-comment-url-input'
                        placeholder="Add a gif or image"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        disabled={Object.values(errorValidation).length > 0}
                        id='new-post-submit-button'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
