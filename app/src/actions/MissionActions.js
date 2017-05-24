import _ from 'lodash';
import {
    MISSIONS_DOWNLOAD,
    MISSIONS_DOWNLOADED_SUCCESS,
    MISSIONS_DOWNLOADED_ERROR,
    MISSIONS_CLEAR_ERROR_MSG,
    START_MISSION,
    SHOW_MISSION,
    DOWNLOAD_MISSION_GEOMETRY
} from './types';
import KortAPI from '../data/KortAPI';

export const downloadMissions = (coordinate, radius, manual) => {
    const { latitude, longitude } = coordinate;
    console.log('download', latitude, longitude);
    return (dispatch) => {
        dispatch({ type: MISSIONS_DOWNLOAD, payload: null });
        const api = new KortAPI();
        api.getMissions(latitude, longitude, radius)
            .then(data => {
                dispatch({
                    type: MISSIONS_DOWNLOADED_SUCCESS,
                    payload: {
                        data,
                        coords: manual ? null : { latitude, longitude } 
                    }
                });
            })
            .catch(errorMsg => {    
                dispatch({
                    type: MISSIONS_DOWNLOADED_ERROR,
                    payload: errorMsg
                });
            });
    };
};

export const startMission = (data, id) => {
    const mission = _.find(data, { id });
    return {
        type: START_MISSION,
        payload: {
            mission,
            data,
            id,
            height: determineMissionHeight(mission)
        }
    };
};

const determineMissionHeight = (mission) => {
    if (mission.type === 'opening_hours') {
        return 400;
    }
    return 300;
};

export const clearErrorMsg = () => {
    return {
        type: MISSIONS_CLEAR_ERROR_MSG,
        payload: null
    };
};

export const showMission = (show) => {
    return {
        type: SHOW_MISSION,
        payload: show
    };
};

export const downloadMissionGeometry = (data, id) => {
    const mission = _.find(data, { id });
    const { osmType, osmId } = mission;
    return (dispatch) => {
        if (osmType !== 'node') {
        const api = new KortAPI();
        api.getMissionGeometry(osmType, osmId)
            .then(response => {
                dispatch({
                    type: DOWNLOAD_MISSION_GEOMETRY,
                    payload: {
                        geom: response,
                        type: osmType
                    }
                });
            })
            .catch(errorMsg => {    
                console.log(errorMsg);
            });
        }
        dispatch({
            type: DOWNLOAD_MISSION_GEOMETRY,
            payload: {
                geom: null,
                type: osmType
            }
        });
    };
};

