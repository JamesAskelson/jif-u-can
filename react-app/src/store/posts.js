import { dataNormalizer } from "./utilities";

// constants

const GET_ALL_POSTS = "get_posts/GET";

// actions

const getPosts = (posts) => ({
    type: GET_ALL_POSTS,
    data: posts,
});

// Thunks

export const getAllPostsThunk = () => async (dispatch) => {
    const res = await fetch("/api/posts");

    if (res.ok) {
        const data = await res.json();
        dispatch(getPosts(data))
    }
};

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
        default: {
            return state;
        }
    }
}
