import {
    GET_MISSIONS,
    GET_MISSION_ANNOTATIONS,
    START_MISSION
 } from '../actions/types';

const INITIAL_STATE = {
    activeMission: {},
    missionAnnotations: [],
    missions: []
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case GET_MISSIONS:
            return { ...state, missions: action.payload };
        case GET_MISSION_ANNOTATIONS:
            return { ...state, missionAnnotations: action.payload };
        case START_MISSION:
            return { ...state, activeMission: action.payload };
        default:
            return state;
    }
};
