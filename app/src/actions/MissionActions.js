import _ from 'lodash';
import {
    MISSIONS_DOWNLOAD,
    MISSIONS_DOWNLOADED_SUCCESS,
    MISSIONS_DOWNLOADED_ERROR,
    MISSIONS_CLEAR_ERROR_MSG,
    START_MISSION,
    SHOW_MISSION
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
    if (mission.type === 'mission_opening_hours') {
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
