import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { getAllPostsThunk, makeNewPost } from "../../store/posts";
import './AddPost.css'

export default function AddPostModal({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [errorValidation, setErrorValidation] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [tag_id, setTagId] = useState(1);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hidden, setHidden] = useState(false);
    const [graphic, setGraphic] = useState("");

    // Submit Handler and Error Checking

    async function handleSubmit(e) {
        e.preventDefault();
        setHasSubmitted(true);

        const errors = {};

        if(!title) errors.title = "Title is required";
        if(title.length < 10 || title.length > 100) errors.title = "Title must be between 10 and 100 characters long";
        if(!hidden) errors.hidden = "Post must be either public or hidden";
        if(!graphic) errors.graphic = "All posts must contain an image or gif";
        if(graphic){
            if(!urlCheck(graphic)) errors.graphic = "Grahpic must end with .jgp, .png, .jpeg, or .gif";
        }


        setErrorValidation({...errors});

        if (!Object.values(errors).length) {
            let data = {
                user_id: user.id,
                tag_id,
                title,
                description,
                hidden,
                graphic
            }
            const newPostId = await dispatch(makeNewPost(data));
            await dispatch(getAllPostsThunk())
            console.log('newpostid',newPostId)
            reset();
            closeModal();
            history.push(`/posts/${newPostId}`);
        }
    }

    function reset() {
        setTagId("");
        setTitle("");
        setDescription("");
        setHidden("");
        setGraphic("");
    }

    const urlCheck = (url) => {
        return (
          url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg") || url.endsWith(".gif")
        );
    };

    return (
        <div id="new-post-form-container">
            <div id='new-post-title'>
                <h1>Create Post</h1>
            </div>
            <hr id='login-title-hr'/>
            <form id="new-post-form" >
                <div id='new-post-info'>

                    <div>
                        {hasSubmitted && <span id='error'>{errorValidation.title}</span>}
                    </div>
                    <div>
                        {hasSubmitted && <span id='error'>{errorValidation.graphic}</span>}
                    </div>
                    <div>
                        {hasSubmitted && <span id='error'>{errorValidation.hidden}</span>}
                    </div>
                    <div id='new-post-title'>
                        <div id='new-post-label'>
                            <label>Title</label>
                        </div>
                        <input
                            id='new-post-title-input'
                            type='text'
                            placeholder='Give your post a unique title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>



                    <div id='new-post-graphic'>
                        <div id='new-post-label'>
                            <label>Graphic</label>
                        </div>
                        <input
                            id='new-post-graphic-input'
                            type='text'
                            placeholder='Graphic url'
                            value={graphic}
                            onChange={(e) => setGraphic(e.target.value)}
                        />
                    </div>

                    <div id='new-post-graphic-preview'>
                        {graphic && (
                                <>
                                <span>Preview</span>
                                <img
                                    id="new-post-graphic-container"
                                    src={graphic}
                                />
                                </>
                            )}
                    </div>

                    <div id='new-post-description'>
                        <div id='new-post-label'>
                            <label>Description (optional)</label>
                        </div>
                        <textarea
                            id='new-post-description-input'
                            type='text'
                            placeholder="Add a description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div id='new-post-tag'>
                        <lable>Pick your Tag</lable>
                        <select
                            id='tag-selector'
                            value={tag_id}
                            onChange={(e) => setTagId(e.target.value)}
                        >
                            <option value={1}>Funny</option>
                            <option value={2}>Fantasy</option>
                            <option value={3}>Gaming</option>
                            <option value={4}>Wholesome</option>
                            <option value={5}>Nature</option>
                        </select>
                    </div>



                    <div id='new-post-hidden'>
                        <label id='new-post-label'>
							Do you want your post to be hidden?
						</label>
                        <div id='new-post-label'>
                            <input
								type="radio"
								value={true}
								name="yes-no"
								onChange={(e) => setHidden(e.target.value)}
								required
							/> Yes
							<input
								type="radio"
								value={false}
								name="yes-no"
								onChange={(e) => setHidden(e.target.value)}
								required
							/> No
                        </div>
                    </div>
                    <hr id='login-title-hr'/>
                    <div id='new-post-submit'>
                            <button type='submit' onClick={handleSubmit} id='new-post-submit-button'>
                                Submit
                            </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
