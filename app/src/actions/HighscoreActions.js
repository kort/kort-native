import {
    HIGHSCORE_DOWNLOAD,
    HIGHSCORE_DOWNLOADED_SUCCESS,
    HIGHSCORE_DOWNLOADED_ERROR,
    TAB_CHANGED,
    HIGHSCORE_CLEAR_ERROR_MSG
} from './types';
import Config from '../constants/Config';
import KortAPI from '../data/KortAPI';

const types = ['day', 'week', 'month', 'all'];

export const downloadHighscore = (index, hideSpinner) => {
    const type = types[index];
   
   return (dispatch) => {
        dispatch({ type: HIGHSCORE_DOWNLOAD, payload: hideSpinner });
        const api = new KortAPI();
        api.getHighscore(type, Config.HIGHSCORE_LIMIT)
            .then(data => {
                dispatch({
                    type: HIGHSCORE_DOWNLOADED_SUCCESS,
                    payload: data
                });
            })
            .catch(errorMsg => {    
                dispatch({
                    type: HIGHSCORE_DOWNLOADED_ERROR,
                    payload: errorMsg
                });
            });
    };
};

export const tabChanged = (index) => {
    return {
        type: TAB_CHANGED,
        payload: index
    };
};

export const clearErrorMsg = () => {
    return {
        type: HIGHSCORE_CLEAR_ERROR_MSG,
        payload: null
    };
};
