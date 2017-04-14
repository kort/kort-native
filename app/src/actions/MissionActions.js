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
        getMissionAnnotations(dispatch, missionsData);
    };
};

export const startMission = (id) => {
    const mission = _.find(missionsData, { id });
    const annotations = createMissionAnnotations(missionsData, id);

    return {
        type: START_MISSION,
        payload0: mission,
        payload1: annotations
    };
};

export const updateMissions = (dispatch, data) => {
    dispatch({
        type: GET_MISSIONS,
        payload: data
    });
};

export const getMissionAnnotations = (dispatch, data) => {
    const annotations = createMissionAnnotations(data, null);
    dispatch({
        type: GET_MISSION_ANNOTATIONS,
        payload: annotations
    });
};

export const createMissionAnnotations = (data, highlightedFeature) => {
    const annotations = [];
    for (const mission of data) {
        if (highlightedFeature === mission.id && mission.geomType !== 'point') {
                annotations.push({
                id: 'geom',
                type: mission.geomType,
                coordinates: mission.coordinates,
                strokeColor: '#395971',
                strokeAlpha: 0.6,
                fillAlpha: 0.6,
                fillColor: '#395971'
            });
        }
        annotations.push({
            id: mission.id,
            type: 'point',
            title: mission.title,
            coordinates: mission.annotationCoordinate,
            annotationImage: {
                source: { uri: `${mission.image}` },
                width: Config.MAPBOX_ANNOTATION_SIZE,
                height: Config.MAPBOX_ANNOTATION_SIZE
            },
        });
    }
    return annotations;
};
