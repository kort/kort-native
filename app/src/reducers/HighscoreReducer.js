import {
    GET_HIGHSCORE,
    TAB_CHANGED
 } from '../actions/types';

const INITIAL_STATE = {
    highscore: {},
    currentTab: 0,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_HIGHSCORE:
            return { ...state, highscore: action.payload };
        case TAB_CHANGED:
            return { ...state, currentTab: action.payload };
        default:
            return state;
    }
};
