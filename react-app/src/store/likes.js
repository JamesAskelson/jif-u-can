import { dataNormalizer } from "./utilities";

// constraints

const GET_SINGLE_POSTS_LIKES = "get_post_likes/GET";
const ADD_LIKE = "add_like/POST";
const DELETE_LIKE = "delete_like/DELETE";

// actions

const getPostLikes = (likes) => ({
    type: GET_SINGLE_POSTS_LIKES,
    data: likes
})

const makeLike = (like) => ({
    type: ADD_LIKE,
    data: like
})

const deleteLike = (like) => ({
    type: DELETE_LIKE,
    data: like
})

//Thunks

export const getAllPostLikesThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/likes`);

    if(res.ok) {
        const data = await res.json();
        dispatch(getPostLikes(data));
    }
}

export const addNewLike = (like) => async (dispatch) => {
    const res = await fetch("/api/likes/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(like)
    })

    if(res.ok) {
        const newLike = await res.json();
        dispatch(makeLike(newLike));
        return newLike.id;
    }
}

export const deleteExistingLike = (likeId) => async (dispatch) => {
    const res = await fetch(`/api/likes/${likeId}`, {
        method: "DELETE",
    })

    if(res.ok) {
        const likeToDelete = await res.json();
        dispatch(deleteLike(likeId))
        return likeToDelete
    }
}

// Reducer

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_SINGLE_POSTS_LIKES: {
            const allPostLikes = action.data;
            const normalizedPostLikes = dataNormalizer(allPostLikes);
            return {
                ...state,
                ...normalizedPostLikes
            }
        }
        case ADD_LIKE: {
            const newState = { ...state };
            const newLike = action.data;
            newState[newLike.id] = newLike;
            return newState;
        }
        case DELETE_LIKE: {
            const newState = { ...state };
            delete newState[action.data];
            return newState;
        }
        default: {
            return state;
        }
    }
}
