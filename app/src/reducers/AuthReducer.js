import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER_CLEAR_ERROR_MSG,
    LOGOUT_USER,
    SHOW_WEBVIEW,
    VERIFY_GOOGLE_TOKEN_ID,
    SECRET_RECEIVED,
    SHOW_CONFIRM_LOGOUT_MODAL,
    HIDE_LOADING_MODAL
 } from '../actions/types';

const INITIAL_STATE = {
    loggedIn: null,
    showConfirm: false,
    loading: false,
    webviewURI: '',
    user: {},
    errorMsg: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGOUT_USER:
            return { ...INITIAL_STATE, loggedIn: false };
        case LOGIN_USER:
            return { ...state,
                     loading: true,
                     loggedIn: false
                 };
        case LOGIN_USER_SUCCESS:
            return { ...state,
                     loading: false,
                     loggedIn: true,
                     user: action.payload
                 };
        case LOGIN_USER_FAILED:
            return { ...state,
                     loading: false,
                     loggedIn: false,
                     errorMsg: action.payload
                 };
        case LOGIN_USER_CLEAR_ERROR_MSG:
            return { ...state, errorMsg: null }; 
        case SHOW_WEBVIEW: 
            return { ...state, webviewURI: action.payload };
        case VERIFY_GOOGLE_TOKEN_ID: 
            return { ...state, ...INITIAL_STATE, loading: true };
        case SECRET_RECEIVED: 
            return { ...state, 
                     loading: true, 
                     loggedIn: false, 
                     user: action.payload
                    };
        case SHOW_CONFIRM_LOGOUT_MODAL:
            return { ...state, showConfirm: action.payload };
        case HIDE_LOADING_MODAL:
            return { ...state, loading: false };
        default:
            return state;
    }
};
