import _ from 'lodash';
import {
    MISSIONS_DOWNLOAD,
    MISSIONS_DOWNLOADED_SUCCESS,
    MISSIONS_DOWNLOADED_ERROR,
    START_MISSION
} from './types';
import KortAPI from '../data/KortAPI';

export const downloadMissions = (lat, lon, radius) => {
    return (dispatch) => {
        console.log('download missions');
        dispatch({ type: MISSIONS_DOWNLOAD, payload: null });
        const api = new KortAPI();
        api.getMissions(lat, lon, radius)
            .then(data => {
                dispatch({
                    type: MISSIONS_DOWNLOADED_SUCCESS,
                    payload: data
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

