import {
    GET_HIGHSCORE
 } from '../actions/types';

const INITIAL_STATE = {
    highscore: {},
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_HIGHSCORE:
            return { ...state, highscore: action.payload };
        default:
            return state;
    }
};
