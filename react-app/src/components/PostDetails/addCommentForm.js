import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPostsThunk } from "../../store/posts";
import './addCommentForm.css'
import { useHistory } from "react-router-dom/";
import { addCommentThunk, getCommentsThunk } from "../../store/comments";

export default function AddCommentForm({ user, post }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errorValidation, setErrorValidation] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(false);

    // useEffect(() => {
    //     errorChecking()
    // }, [text, url])

    async function handleSubmit(e) {
        e.preventDefault();
        setHasSubmitted(true);

        const errors = {}

        if(!text && !url) errors.general = "Comment must have either text or an image/gif"
        if (text && text.length > 255) {
            errors.text = "Text must be less than 255 chars";
        }
        // if (url && !urlCheck(url)) {
        //     errors.url = "Any url must end with .jpg, .png, .jpeg, or .gif";
        // }

        setErrorValidation({...errors})

        if(!Object.values(errors).length){
            const formData = new FormData();
            formData.append('user_id', user.id);
            formData.append('post_id', post.id);
            formData.append('text', text);
            formData.append('url', url);
            setImageLoading(true);
            await dispatch(addCommentThunk(formData))
            await dispatch(getCommentsThunk());
            await dispatch(getAllPostsThunk());
            reset()
            // window.location.reload();
        }
    }

    function reset() {
        setText("");
        setUrl("");
    }

    // const errorChecking = () => {

    // }

    const urlCheck = (url) => {
        return (
          url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg") || url.endsWith(".gif")
        );
    };

    return (
        <div id='new-comments-form-container'>
            <form id='new-comment-form' encType="multipart/form-data">
                <div id='new-comment-text'>
                    <textarea
                        id='new-comment-text-input'
                        placeholder="Write a comment (max length: 255)"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div id='comment-error-container'>
                    {hasSubmitted && <span id='comment-error'>{errorValidation.general}</span>}
                    {hasSubmitted && <span id='comment-error'>{errorValidation.text}</span>}
                    {hasSubmitted && <span id='comment-error'>{errorValidation.url}</span>}
                </div>
                <div id='new-comment-img-submit'>
                    <div id='new-comment-img'>
                        <div id='new-comment-img-input'>
                            <input
                                id='new-comment-url-input'
                                type="file"
                                placeholder="Add a gif or image"
                                accept="image/*"
                                onChange={(e) => setUrl(e.target.files[0])}
                            />
                        </div>
                        {/* <div id='new-comment-graphic-preview'>
                            {url && (
                                    <img
                                        id="new-post-graphic-container"
                                        src={url}
                                    />
                                )}
                        </div> */}
                    </div>
                    <div id='new-comment-submit-button'>
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            // disabled={!text && !url}
                            id='new-post-submit-button'>
                            Submit
                        </button>
                        {/* {(imageLoading)&& <p>Loading...</p>} */}
                    </div>
                </div>
            </form>
        </div>
    )
}
