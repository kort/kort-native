import {
    MAP_ROTATION_CHANGED,
    STATS_CHANGED,
 } from '../actions/types';

const INITIAL_STATE = {
    stats: false,
    mapRotation: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MAP_ROTATION_CHANGED:
            return { ...state, mapRotation: action.payload };
        case STATS_CHANGED:
            return { ...state, stats: action.payload };
        default:
            return state;
    }
};
