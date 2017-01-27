import {
    LOGOUT_USER,
    SHOW_WEBVIEW,
    VERIFY_GOOGLE_TOKEN_ID,
    SECRET_RECEIVED
 } from '../actions/types';

const INITIAL_STATE = {
    loggedIn: false,
    kortSecret: '',
    modalMode: '',
    loading: false,
    webViewVisible: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGOUT_USER:
            return { INITIAL_STATE };
        case SHOW_WEBVIEW: 
            return { ...state, webViewVisible: true };
        case VERIFY_GOOGLE_TOKEN_ID: 
            return { ...state, ...INITIAL_STATE, loading: true };
        case SECRET_RECEIVED: 
            return { ...state, loading: false, loggedIn: true, kortSecret: action.payload, modalMode: '' };
        default:
            return state;
    }
};
