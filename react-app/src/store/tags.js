import { dataNormalizer } from "./utilities";

// constraints

const GET_ALL_TAGS = "get_all_tags/GET"

//actions

const getTags = (tags) => ({
    type: GET_ALL_TAGS,
    data: tags
})

// thunks

export const getAllTagsThunk = () => async (dispatch) => {
    const res = await fetch("/api/tags");


    if (res.ok) {
        const data = await res.json()
        dispatch(getTags(data))
    }
}

//reducer

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TAGS: {
            const allTags = action.data;
            const normalizedTags = dataNormalizer(allTags);
            return {
                ...state,
                ...normalizedTags,
            };
        }
        default: {
            return state;
        }
    }
}
