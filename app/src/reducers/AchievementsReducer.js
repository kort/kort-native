import {
    GET_ACHIEVEMENTS
 } from '../actions/types';

const INITIAL_STATE = {
    achievements: {},
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ACHIEVEMENTS:
            return { ...state, achievements: action.payload };
        default:
            return state;
    }
};
