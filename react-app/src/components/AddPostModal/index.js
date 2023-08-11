import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { makeNewPost } from "../../store/posts";

export default function AddPostModal({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [errorValidation, setErrorValidation] = useState({});
    // const [hasSubmitted, setHasSubmitted] = useState(false);
    const [tag_id, setTagId] = useState(1);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hidden, setHidden] = useState(false);
    const [graphic, setGraphic] = useState("");

    // Error Checking

    useEffect(() => {
       errorChecker()
    }, [tag_id, title, description, hidden, graphic]);

    // Submit Handler

    async function handleSubmit(e) {
        e.preventDefault();
        // setHasSubmitted(true);

        console.log(errorValidation)
        if (!Object.values(errorValidation).length) {
            let data = {
                user_id: user.id,
                tag_id,
                title,
                description,
                hidden,
                graphic
            }
            const newPostId = await dispatch(makeNewPost(data));
            console.log('newpostid',newPostId)
            reset();
            closeModal();
            history.push(`/posts/${newPostId}`);
        }
    }

    // Helper Functions

    function errorChecker() {
        const errors = {}
        if(!title) errors.title = "Title is required";
        if(title.length < 10 || title.length > 100) errors.title = "Title must be between 10 and 100 characters long"
        if(!hidden) errors.hidden = "Post must be either public or hidden"
        if(!graphic) errors.graphic = "All posts must contain an image or gif"
        if(!urlCheck(graphic)) errors.graphic = "All graphics must be in an image or gif format (.jgp, .png, .jpeg, .gif)"

        setErrorValidation(errors)
    }


    function reset() {
        setTagId("");
        setTitle("");
        setDescription("");
        setHidden("");
        setGraphic("");
        setErrorValidation({});
    }

    const urlCheck = (url) => {
        return (
          url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg") || url.endsWith(".gif")
        );
    };

    console.log(user)
    return (
        <div id="new-post-form-container">
            <form id="new-post-form" onSubmit={handleSubmit}>
                <div id='new-post-info'>
                    <div id='new-post-title'>
                        {errorValidation.title}
                        <input
                            id='new-post-title-input'
                            type='text'
                            placeholder='Give your post a unique title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div id='new-post-graphic'>
                        {errorValidation.graphic}
                        <input
                            id='new-post-graphic-input'
                            type='text'
                            placeholder='graphic url'
                            value={graphic}
                            onChange={(e) => setGraphic(e.target.value)}
                        />

                    </div>
                    <div id='new-post-graphic-preview'>
                        {graphic && (
                                <img
                                    id="new-post-graphic-container"
                                    src={graphic}
                                />
                            )}
                    </div>
                    <div id='new-post-description'>
                        {errorValidation.description}
                        <input
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
                    <div id='new-post-submit'>
                            <button type='submit' id='new-post-submit-button'>
                                Submit
                            </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
