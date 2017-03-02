import {
    GET_HIGHSCORE,
    TAB_CHANGED
} from './types';

export const downloadHighscore = (index) => {
    //TODO use API
    let data;
    switch (index) {
        case 3:
        data = require('../../assets/data/highscore_year.json');
        break;
        case 2:
        data = require('../../assets/data/highscore_month.json');
        break;
        case 1:
        data = require('../../assets/data/highscore_week.json');
        break;
        default: 
        case 0:
        data = require('../../assets/data/highscore_day.json');
    }
   
    return {
        type: GET_HIGHSCORE,
        payload: data
    };
};

export const tabChanged = (index) => {
    return {
        type: TAB_CHANGED,
        payload: index
    };
};
