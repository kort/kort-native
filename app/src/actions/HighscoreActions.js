import {
    GET_HIGHSCORE
} from './types';

export const downloadHighscore = () => {
    //TODO use API
    const data = require('../../assets/data/highscore.json');
   
    return {
        type: GET_HIGHSCORE,
        payload: data
    };
};
