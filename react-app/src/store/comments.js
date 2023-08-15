import { dataNormalizer } from "./utilities";

// constraints

const GET_ALL_USER_COMMENTS = "get_user_comments/GET";
// const ADD_USER_COMMENT = "add_user_comment/POST";
// const EDIT_USER_COMMENT = "edit_user_comments/PATCH";
// const DELETE_USER_COMMENT = "delete_user_comment/DELETE";

// actions

const getUserComments = (comments) => ({
    type: GET_ALL_USER_COMMENTS,
    data: comments
})

// const addUserComment = (comment) => ({
//     type: ADD_USER_COMMENT,
//     data: comment
// })

// const editUserComment = (comment) => ({
//     type: EDIT_USER_COMMENT,
//     data: comment
// })

// const deleteUserComment = (comment) => ({
//     type: DELETE_USER_COMMENT,
//     data: comment
// })

// thunk

export const getUserCommentsThunk = () => async (dispatch) => {
    const res = await fetch("/api/comments/");

    if (res.ok) {
        const data = await res.json()
        dispatch(getUserComments(data))
    }
}

// export const addCommentToUserCommentsThunk = (comment) => async (dispatch) => {
//     const res = await fetch("/api/comments/new", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(comment),
//     })
//     if(res.ok) {
//         const newComment = await res.json()
//         dispatch(addUserComment(newComment))
//         return newComment
//     }
// }

// export const editCommentToUserCommentsThunk = (comment, commentId) => async (dispatch) => {
//     console.log(comment, commentId)
//     const res = await fetch(`/api/comments/${commentId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(comment)
//     });

//     if(res.ok) {
//         const edittedComment = await res.json();
//         dispatch(editUserComment(edittedComment));
//         return edittedComment
//     }
// }

// export const deleteUserCommentThunk = (commentId) => async (dispatch) => {
//     const res = await fetch(`/api/comments/${commentId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json"}
//     })

//     if (res.ok) {
//         dispatch(deleteUserComment(commentId))
//     }
// }

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
        // case ADD_USER_COMMENT: {
        //     const newState = { ...state };
        //     const newComment = action.data;
        //     newState[newComment.id] = newComment;
        //     return newState;
        // }
        // case EDIT_USER_COMMENT: {
        //     const newState = { ...state };
        //     const editComment = action.data;
        //     newState[editComment.id] = editComment;
        //     return newState;
        // }
        // case DELETE_USER_COMMENT: {
        //     const newState = { ...state };
        //     delete newState[action.data.id];
        //     return newState;
        // }
        default: {
            return state;
        }
    }
}
