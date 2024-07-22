import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Constants for authentification actions
export const LOGIN_USER = "LOGIN_SUCCESS";
export const LOGOUT_USER = "LOGOUT_USER";

// Initial state of authentication
const initialAuthState = {
    token: null,
};

// Authentification reducer
export const authentification = (state = initialAuthState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                token: action.payload,
            };
        case LOGOUT_USER:
            sessionStorage.clear();
            localStorage.clear();
            console.log("utilisateur déconnecté");
            return initialAuthState;
        default:
            return state;
    }
};

// Authentification actions
export const loginUser = (token) => ({
    type: LOGIN_USER,
    payload: token,
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

// Constants for user actions
export const GET_USERPROFILE = "GET_USERPROFILE";
export const EDIT_USERNAME = "EDIT_USERNAME";

// Initial user state
const initialUserState = {
    userData: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
    },
};

// User reducer
export const user = (state = initialUserState, action) => {
    switch (action.type) {
        case GET_USERPROFILE:
            return {
                ...state,
                userData: action.payload,
            };
        case EDIT_USERNAME:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    userName: action.payload,
                },
            };
        default:
            return state;
    }
};

// User actions
export const userProfile = (userData) => ({
    type: GET_USERPROFILE,
    payload: userData,
});

export const updateUsername = (userName) => ({
    type: EDIT_USERNAME,
    payload: userName,
});

// Combine reducers
const rootReducer = combineReducers({
    authentification,
    user,
});

// Configure store
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export default store;