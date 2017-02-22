import {
    TOGGLE_MAPMODE_FULLSCREEN,
    LOCATION_UPDATE,
    LOCATION_ACCURACY_INSUFFICIENT
 } from '../actions/types';

const INITIAL_STATE = {
    mapModeFullScreen: false,
    currentLocation: { latitude: 0, longitude: 0 },
    accuracyThresholdReached: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case TOGGLE_MAPMODE_FULLSCREEN:
            return { ...state, mapModeFullScreen: action.payload };
        case LOCATION_UPDATE:
            return { ...state, currentLocation: action.payload };
        case LOCATION_ACCURACY_INSUFFICIENT:
            return { ...state, accuracyThresholdReached: action.payload };
        default:
            return state;
    }
};
