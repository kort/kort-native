import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    SHOW_WEBVIEW,
    VERIFY_GOOGLE_TOKEN_ID,
    SECRET_RECEIVED
 } from '../actions/types';

const INITIAL_STATE = {
    loggedIn: false,
    kortSecret: {},
    modalMode: '',
    loading: false,
    webviewURI: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGOUT_USER:
            return { ...INITIAL_STATE };
        case LOGIN_USER:
            return { ...state,
                     loading: true,
                     loggedIn: false
                 };
        case LOGIN_USER_SUCCESS:
            console.log('logged in ', ...state);
            return { ...state,
                     loading: false,
                     loggedIn: true,
                     kortSecret: action.payload
                 };
        case LOGIN_USER_FAILED:
            return { ...state,
                     loading: false,
                     loggedIn: false,
                 };
        case SHOW_WEBVIEW: 
            return { ...state, webviewURI: action.payload };
        case VERIFY_GOOGLE_TOKEN_ID: 
            return { ...state, ...INITIAL_STATE, loading: true };
        case SECRET_RECEIVED: 
            return { ...state, 
                     loading: true, 
                     loggedIn: false, 
                     kortSecret: action.payload, 
                     modalMode: '' 
                    };
        default:
            return state;
    }
};
