import {
    MAP_ROTATION_CHANGED,
    STATS_CHANGED,
    APP_SETTINGS_LOADED
 } from '../actions/types';

const INITIAL_STATE = {
    stats: false,
    mapRotation: false,
    appSettingsLoaded: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MAP_ROTATION_CHANGED:
            return { ...state, mapRotation: action.payload };
        case STATS_CHANGED:
            return { ...state, stats: action.payload };
        case APP_SETTINGS_LOADED:
            return { ...state, appSettingsLoaded: action.payload };
        default:
            return state;
    }
};
