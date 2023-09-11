import { dataNormalizer } from "./utilities";

// constraints

const GET_USER_FAVS = "get_user_favs/GET";
const ADD_FAV = "add_fav/POST";
const DELETE_FAV = "delete_fav/DELETE"

// actions

const getUserFavs = (favs)=> ({
    type: GET_USER_FAVS,
    data: favs
})

const makeFav = (fav) => ({
    type: ADD_FAV,
    data: fav
})

const deleteFav = (fav) => ({
    type: DELETE_FAV,
    data: fav
})

// thunks

export const getAllUserFavs = () => async (dispatch) => {
    const res = await fetch('/api/favorites/current');

    if(res.ok) {
        const data = await res.json();
        dispatch(getUserFavs(data))
    }
}

export const addNewFav = (fav) => async (dispatch) => {
    const res = await fetch("/api/favorites/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fav)
    })

    if(res.ok) {
        const newFav = await res.json();
        dispatch(makeFav(newFav))
        return newFav.id;
    }
}

export const deleteExistingFav = (favId) => async (dispatch) => {
    const res = await fetch(`/api/favorites/${favId}`, {
        method: "DELETE",
    })

    if(res.ok) {
        const favToDelete = await res.json();
        dispatch(deleteFav(favId))
        return favToDelete
    }
}

// reducer

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_FAVS: {
            const allUserFavs = action.data;
            const normalizedFavs = dataNormalizer(allUserFavs);
            return {
                ...state,
                ...normalizedFavs
            }
        }
        case ADD_FAV: {
            const newState = { ...state };
            const newFav = action.data;
            newState[newFav.id] = newFav;
            return newState;
        }
        case DELETE_FAV: {
            const newState = { ...state };
            delete newState[action.data];
            return newState;
        }
        default: {
            return state;
        }
    }
}
