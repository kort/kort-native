import {
    ACHIEVEMENTS_DOWNLOAD,
    ACHIEVEMENTS_DOWNLOADED_SUCCESS,
    ACHIEVEMENTS_DOWNLOADED_ERROR,
    ACHIEVEMENTS_CLEAR_ERROR_MSG
 } from '../actions/types';

const INITIAL_STATE = {
    achievements: {},
    loading: false,
    downloading: false,
    errorMsg: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACHIEVEMENTS_DOWNLOAD:
            return { ...state, loading: action.payload, downloading: true };
        case ACHIEVEMENTS_DOWNLOADED_SUCCESS:
            return { ...state, loading: false, downloading: false, achievements: action.payload };
        case ACHIEVEMENTS_DOWNLOADED_ERROR:
            return { ...state, loading: false, downloading: false, errorMsg: action.payload };
        case ACHIEVEMENTS_CLEAR_ERROR_MSG:
            return { ...state, errorMsg: action.payload };
        default:
            return state;
    }
};
