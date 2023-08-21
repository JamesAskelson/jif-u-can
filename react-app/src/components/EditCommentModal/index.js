import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editCommentThunk, getAllPostsThunk } from "../../store/posts";
import { useModal } from "../../context/Modal";
import './EditComment.css'

export default function EditCommentModal({ user, post, comment }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errorValidation, setErrorValidation] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [text, setText] = useState(comment.text);
    const [url, setUrl] = useState(comment.url);

    // useEffect(() => {
    //     errorChecking()
    // }, [text])

    async function handleSubmit(e) {
        e.preventDefault();
        setHasSubmitted(true);

        const errors = {}

        if(!text && !url) errors.general = "Comment must have either text or an image/gif"

        if (text && text.length > 255) {
            errors.text = "Text must be less than 255 chars";
        }

        if (url && !urlCheck(url)) {
            errors.url = "Any url must end with .jpg, .png, .jpeg, or .gif";
        }

        setErrorValidation({...errors})

        if(!Object.values(errors).length){
            let data = {
                user_id: user.id,
                post_id: post.id,
                text,
                url
            }
            console.log('comment', comment.id)
            dispatch(editCommentThunk(data, comment.id))
            dispatch(getAllPostsThunk())
            reset()
            closeModal()
        }
    }

    function reset() {
        setText("");
        setUrl("");
    }

    const urlCheck = (url) => {
        return (
          url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg") || url.endsWith(".gif")
        );
    };

    return (
        <div id='edit-comments-form-container'>
            <form id='edit-comment-form'>
                <div id='edit-comment-text'>
                    <textarea
                        id='new-comment-text-input'
                        placeholder="Write a comment (max length: 255)"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div>
                    {hasSubmitted && <span id='comment-error'>{errorValidation.general}</span>}
                    {hasSubmitted && <span id='comment-error'>{errorValidation.text}</span>}
                    {hasSubmitted && <span id='comment-error'>{errorValidation.url}</span>}
                </div>
                <div id='edit-comment-img-submit'>
                    <div id='edit-comment-img'>
                        <div id='edit-comment-img-input'>
                            <input
                                id='new-comment-url-input'
                                placeholder="Add a gif or image"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        <div id='edit-comment-graphic-preview'>
                            {url && (
                                    <img
                                        id="new-post-graphic-container"
                                        src={url}
                                    />
                                )}
                        </div>
                    </div>
                    <div id='edit-comment-submit-button'>
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            id='new-post-submit-button'>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
