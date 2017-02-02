import {
    TOGGLE_MAPMODE_FULLSCREEN
 } from '../actions/types';

const INITIAL_STATE = {
    mapModeFullScreen: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case TOGGLE_MAPMODE_FULLSCREEN:
            return { ...state, mapModeFullScreen: action.payload };
        default:
            return state;
    }
};
