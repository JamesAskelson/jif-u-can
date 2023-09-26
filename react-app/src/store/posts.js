import { dataNormalizer } from "./utilities";

// constaints

const GET_ALL_POSTS = "get_posts/GET";
const GET_SINGLE_POST = "get_single_post/GET"
const CREATE_POST = "create_post/POST";
const EDIT_POST = "edit_post/POST";
const DELETE_POST = "delete_post/DELETE";
const ADD_COMMENT_TO_POST = 'add_comment_to_post/POST'
const EDIT_COMMENT_ON_POST = 'edit_comment/PATCH'
const DELETE_COMMENT_ON_POST = 'delete_comment/DELETE'

// actions

const getPosts = (posts) => ({
    type: GET_ALL_POSTS,
    data: posts,
});

const getPost = (post) => ({
    type: GET_SINGLE_POST,
    data: post
})

const makePost = (post) => ({
    type: CREATE_POST,
    data: post,
})

const editPost = (post) => ({
    type: EDIT_POST,
    data: post
})

const deletePost = (post) => ({
    type: DELETE_POST,
    data: post
})

const addCommentToPost = (comment) => ({
    type: ADD_COMMENT_TO_POST,
    data: comment
})

const editComment = (comment) => ({
    type: EDIT_COMMENT_ON_POST,
    data: comment
})

const deleteComment = (commentArr) => ({
    type: DELETE_COMMENT_ON_POST,
    data: commentArr
})

// Thunks

// posts

export const getAllPostsThunk = () => async (dispatch) => {
    const res = await fetch("/api/posts");

    if (res.ok) {
        const data = await res.json();
        dispatch(getPosts(data))
    }
};

export const getSingleSpotByIdThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getPost(data))
    }
}

export const makeNewPost = (formData) => async (dispatch) => {

    const res = await fetch("/api/posts/new", {
        method: "POST",
        body: formData,
    })
    if(res.ok) {
        const newPost = await res.json();
        // console.log('in thunk', newPost)
        dispatch(makePost(newPost));
        return newPost.id;
    } else {
        // console.log("There was an error making your post!")
    }
}

export const editExistingPost = (formData, postId) => async (dispatch) => {

    const res = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        body: formData,
    });

    if(res.ok) {
        const edittedPost = await res.json();

        dispatch(editPost(edittedPost));
        return edittedPost
    }
}

export const deleteExistingPost = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    })

    if(res.ok) {
        const postToDelete = await res.json();
        dispatch(deletePost(postId))
        return postToDelete
    }
}

// comments

export const addCommentToPostThunk = (formData) => async (dispatch) => {
    const res = await fetch("/api/comments/new", {
        method: "POST",
        body: formData
    })
    if(res.ok) {
        const newComment = await res.json()
        dispatch(addCommentToPost(newComment))
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

export const deleteCommentThunk = (postId, commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json"}
    })

    if (res.ok) {
        dispatch(deleteComment([postId, commentId]))
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
        case DELETE_POST: {
            const newState = { ...state };
            delete newState[action.data];
            return newState
        }
        case ADD_COMMENT_TO_POST: {
            const newState = { ...state };
            newState[action.data.post_id].post_comments.push(action.data);
            return newState;
        }
        case EDIT_COMMENT_ON_POST: {
            const newState = { ...state };
            const postComments = newState[action.data.post_id].post_comments
            const commentIndex = postComments.findIndex((comment) => comment.id === action.data.id);
            postComments[commentIndex] = action.data;
            return newState;
        }
        case DELETE_COMMENT_ON_POST: {
            const [postId, commentId] = action.data;
            const newState = { ...state }
            const postComments = newState[postId].post_comments;
            const commentIndex = postComments.findIndex((comment) => comment.id === commentId);
            postComments.splice(commentIndex, 1);
            return newState;
        }
        default: {
            return state;
        }
    }
}
