import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCommentToPostThunk } from "../../store/posts";

export default function AddCommentForm({ user, post }) {
    const dispatch = useDispatch();
    const [errorValidation, setErrorValidation] = useState({});
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");

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
        dispatch(addCommentToPostThunk(data))
        reset()
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
