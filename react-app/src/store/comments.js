import { dataNormalizer } from "./utilities";

// constraints

const GET_ALL_USER_COMMENTS = "get_user_comments/GET";

// actions

const getUserComments = (comments) => ({
    type: GET_ALL_USER_COMMENTS,
    data: comments
})

// thunk

export const getUserCommentsThunk = () => async (dispatch) => {
    const res = await fetch("/api/comments/");

    if (res.ok) {
        const data = await res.json()
        dispatch(getUserComments(data))
    }
}

// comments reducer

const initialState = {};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_USER_COMMENTS: {
            const allComments = action.data;
            const normalizeComments = dataNormalizer(allComments)
            return {
                ...normalizeComments
            }
        }
        default: {
            return state;
        }
    }
}
