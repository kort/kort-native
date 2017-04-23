import _ from 'lodash';
import {
    MISSIONS_DOWNLOAD,
    MISSIONS_DOWNLOADED_SUCCESS,
    MISSIONS_DOWNLOADED_ERROR,
    MISSIONS_CLEAR_ERROR_MSG,
    START_MISSION
} from './types';
import KortAPI from '../data/KortAPI';

export const downloadMissions = (coordinate, radius) => {
    const { latitude, longitude } = coordinate;
    return (dispatch) => {
        dispatch({ type: MISSIONS_DOWNLOAD, payload: null });
        const api = new KortAPI();
        api.getMissions(latitude, longitude, radius)
            .then(data => {
                dispatch({
                    type: MISSIONS_DOWNLOADED_SUCCESS,
                    payload: [data, { latitude, longitude }]
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
        payload: [mission, data, id]
    };
};

export const clearErrorMsg = () => {
    return {
        type: MISSIONS_CLEAR_ERROR_MSG,
        payload: null
    };
};
