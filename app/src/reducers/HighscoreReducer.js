import {
    HIGHSCORE_DOWNLOAD,
    HIGHSCORE_DOWNLOADED_SUCCESS,
    HIGHSCORE_DOWNLOADED_ERROR,
    HIGHSCORE_CLEAR_ERROR_MSG,
    TAB_CHANGED
 } from '../actions/types';

const INITIAL_STATE = {
    highscore: {},
    currentTab: 0,
    loading: false,
    downloading: false,
    errorMsg: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HIGHSCORE_DOWNLOAD:
            return { ...state, loading: action.payload, downloading: true };
        case HIGHSCORE_DOWNLOADED_SUCCESS:
            return { ...state, loading: false, downloading: false, highscore: action.payload };
        case HIGHSCORE_DOWNLOADED_ERROR:
            return { ...state, loading: false, downloading: false, errorMsg: action.payload };
        case HIGHSCORE_CLEAR_ERROR_MSG:
            return { ...state, errorMsg: action.payload };
        case TAB_CHANGED:
            return { ...state, currentTab: action.payload };
        default:
            return state;
    }
};
