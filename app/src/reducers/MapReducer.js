import {
    TOGGLE_MAPMODE_FULLSCREEN,
    LOCATION_UPDATE
 } from '../actions/types';

const INITIAL_STATE = {
    mapModeFullScreen: false,
    currentLocation: { latitude: 0, longitude: 0 }
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case TOGGLE_MAPMODE_FULLSCREEN:
            return { ...state, mapModeFullScreen: action.payload };
        case LOCATION_UPDATE:
            return { ...state, currentLocation: action.payload };
        default:
            return state;
    }
};
