import { dataNormalizer } from "./utilities";

// constraints

const GET_ALL_COMMENTS = "get_comments/GET";
const ADD_COMMENT = "add_comment/POST";
const EDIT_COMMENT = "edit_comment/PATCH";
const DELETE_COMMENT = "delete_comment/DELETE";

// actions

const getComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    data: comments
})

const addComment = (comment) => ({
    type: ADD_COMMENT,
    data: comment
})

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    data: comment
})

const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    data: comment
})

// thunk

export const getCommentsThunk = () => async (dispatch) => {
    const res = await fetch("/api/comments");

    if (res.ok) {
        const data = await res.json()
        dispatch(getComments(data))
    }
}

export const addCommentThunk = (formData) => async (dispatch) => {
    const res = await fetch("/api/comments/new", {
        method: "POST",
        body: formData
    })
    if(res.ok) {
        const newComment = await res.json()
        dispatch(addComment(newComment))
        return newComment
    }
}

export const editCommentThunk = (formData, commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        body: formData
    });

    if(res.ok) {
        const edittedComment = await res.json();
        dispatch(editComment(edittedComment));
        return edittedComment
    }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json"}
    })

    if (res.ok) {
        dispatch(deleteComment(commentId))
    }
}

// comments reducer

const initialState = {};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_COMMENTS: {
            const Comments = action.data;
            const normalizeComments = dataNormalizer(Comments)
            return {
                ...state,
                ...normalizeComments
            }
        }
        case ADD_COMMENT: {
            const newState = { ...state };
            const newComment = action.data;
            newState[newComment.id] = newComment;
            return newState;
        }
        case EDIT_COMMENT: {
            const newState = { ...state };
            const editComment = action.data;
            newState[editComment.id] = editComment;
            return newState;
        }
        case DELETE_COMMENT: {
            const newState = { ...state };
            delete newState[action.data];
            return newState;
        }
        default: {
            return state;
        }
    }
}
