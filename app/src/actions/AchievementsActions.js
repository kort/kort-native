import {
    GET_ACHIEVEMENTS
} from './types';

export const downloadAchievements = () => {
    //TODO use API
    const data = require('../../assets/data/achievements.json');

    return {
        type: GET_ACHIEVEMENTS,
        payload: data
    };
};
