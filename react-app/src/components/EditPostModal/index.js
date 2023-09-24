import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { editExistingPost, getAllPostsThunk } from "../../store/posts";

export default function EditPostModal({ user, post }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [errorValidation, setErrorValidation] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [tag_id, setTagId] = useState(post.tag_id);
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [hidden, setHidden] = useState(post.hidden);
    const [graphic, setGraphic] = useState(post.post_graphic[0].url);
    const [imageLoading, setImageLoading] = useState(false);
    // Submit Handler and Error Checking

    async function handleSubmit(e) {
        e.preventDefault();
        setHasSubmitted(true);

        const errors = {};

        if(!title) errors.title = "Title is required";
        if(title.length < 10 || title.length > 100) errors.title = "Title must be between 10 and 100 characters long";

        setErrorValidation({...errors});

        if (!Object.values(errors).length) {
            const formData = new FormData();
            formData.append('user_id', user.id);
            formData.append('tag_id', tag_id);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('hidden', hidden);
            formData.append('graphic', graphic);
            // let data = {
            //     user_id: user.id,
            //     tag_id,
            //     title,
            //     description,
            //     hidden: Number(hidden),
            //     graphic
            // }
            setImageLoading(true);
            const newPostId = await dispatch(editExistingPost(formData, post.id));
            dispatch(getAllPostsThunk())
            reset();
            closeModal();
            history.push(`/posts/${newPostId.id}`);
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
                <h1>Edit Post</h1>
            </div>
            <hr id='login-title-hr'/>
            <form id="new-post-form" enctype="multipart/form-data">
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
                            type='file'
                            accept="image/gif/*"
                            onChange={(e) => setGraphic(e.target.files[0])}

                        />
                    </div>

                    {/* <div id='new-post-graphic-preview'>
                        {graphic && (
                                <>
                                <span>Preview</span>
                                <img
                                    id="new-post-graphic-container"
                                    src={graphic}
                                />
                                </>
                            )}
                    </div> */}

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
                        <label>
							Do you want your post to be hidden?
						</label>
                        <div id='new-post-label-hidden'>
                        <input
								type="radio"
								value={true}
								name="yes-no"
								onChange={(e) => setHidden(true)}
                                checked={hidden}
							/> Yes
							<input
								type="radio"
								value={false}
								name="yes-no"
								onChange={(e) => setHidden(false)}
                                checked={!hidden}
							/> No
                        </div>
                    </div>
                    <hr id='login-title-hr'/>
                    <div id='new-post-submit'>
                            <button type='submit' onClick={handleSubmit} id='new-post-submit-button'>
                                Submit
                            </button>
                            {(imageLoading)&& <p>Loading...</p>}
                    </div>
                </div>
            </form>
        </div>
    )
}
