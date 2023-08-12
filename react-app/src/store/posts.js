import { dataNormalizer } from "./utilities";

// constants

const GET_ALL_POSTS = "get_posts/GET";
const CREATE_POST = "create_post/POST";
const EDIT_POST = "edit_post/POST";

// actions

const getPosts = (posts) => ({
    type: GET_ALL_POSTS,
    data: posts,
});

const makePost = (post) => ({
    type: CREATE_POST,
    data: post,
})

const editPost = (post) => ({
    type: EDIT_POST,
    data: post
})

// Thunks

export const getAllPostsThunk = () => async (dispatch) => {
    const res = await fetch("/api/posts");

    if (res.ok) {
        const data = await res.json();
        dispatch(getPosts(data))
    }
};

export const makeNewPost = (post) => async (dispatch) => {

    const res = await fetch("/api/posts/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
    })
    if(res.ok) {
        const newPost = await res.json();
        dispatch(makePost(newPost));
        return newPost.id;
    }
}

export const editExistingPost = (post, postId) => async (dispatch) => {
    // console.log('postid', postId)

    const res = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
    });

    if(res.ok) {
        const edittedPost = await res.json();
        dispatch(editPost(edittedPost));
        console.log('thunk return', edittedPost)
        return edittedPost
    }
}

// Reducer

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_POSTS: {
            const allPosts = action.data;
            const normalizedPosts = dataNormalizer(allPosts);
            return {
                ...state,
                ...normalizedPosts,
            };
        }
        case CREATE_POST: {
            const newState = { ...state };
            const newPost = action.data;
            newState[newPost.id] = newPost;
            return newState;
        }
        case EDIT_POST: {
            const newState = { ...state };
            const edittedPost = action.data;
            newState[edittedPost.id] = edittedPost;
            return newState;
        }
        default: {
            return state;
        }
    }
}
