import _ from 'lodash';
import missionsData from '../../assets/data/missions.json';
import {
    GET_MISSIONS,
    GET_MISSION_ANNOTATIONS,
    START_MISSION
} from './types';
import Config from '../constants/Config';

export const downloadMissions = () => {
    //TODO call API with lat, lon, radius
    return (dispatch) => {
        updateMissions(dispatch, missionsData);
        createMissionAnnotations(dispatch, missionsData);
    };
};

export const startMission = (id) => {
    const mission = _.find(missionsData, { id });
    return {
        type: START_MISSION,
        payload: mission
    };
};

export const updateMissions = (dispatch, data) => {
    dispatch({
        type: GET_MISSIONS,
        payload: data
    });
};

export const createMissionAnnotations = (dispatch, data) => {
    const annotations = [];
    for (const mission of data) {
        annotations.push({
            id: mission.id,
            type: 'point',
            title: 'Mission',
            coordinates: [parseFloat(mission.lat), parseFloat(mission.lon)],
            annotationImage: {
                source: { uri: `${mission.image}` },
                width: Config.MAPBOX_ANNOTATION_SIZE,
                height: Config.MAPBOX_ANNOTATION_SIZE
            },
        });
    }
    dispatch({
        type: GET_MISSION_ANNOTATIONS,
        payload: annotations
    });
};
