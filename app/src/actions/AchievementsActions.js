import {
    ACHIEVEMENTS_DOWNLOAD,
    ACHIEVEMENTS_DOWNLOADED_SUCCESS,
    ACHIEVEMENTS_DOWNLOADED_ERROR,
    ACHIEVEMENTS_CLEAR_ERROR_MSG
} from './types';
import KortAPI from '../data/KortAPI';

export const downloadAchievements = (hideSpinner) => {
    return (dispatch) => {
        dispatch({ type: ACHIEVEMENTS_DOWNLOAD, payload: hideSpinner });
        const api = new KortAPI();
        api.getAchievements()
            .then(data => {
                //extend data for better UI XP, numberOfItemsInRow
                const num = 3;
                const offset = (num - (data.length % num)) % num;
                for (let i = 0; i < offset; ++i) {
                    data.push({});
                }
                dispatch({
                    type: ACHIEVEMENTS_DOWNLOADED_SUCCESS,
                    payload: data
                });
            })
            .catch(errorMsg => {    
                dispatch({
                    type: ACHIEVEMENTS_DOWNLOADED_ERROR,
                    payload: errorMsg
                });
            });
    };
};

export const clearErrorMsg = () => {
    return {
        type: ACHIEVEMENTS_CLEAR_ERROR_MSG,
        payload: null
    };
};
