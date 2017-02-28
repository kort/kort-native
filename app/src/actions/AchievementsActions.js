import {
    GET_ACHIEVEMENTS
} from './types';

export const downloadAchievements = () => {
    //TODO use API
    const data = require('../../assets/data/achievements.json');

    //extend data for better UI XP, numberOfItemsInRow
    const num = 3;
    const offset = (num - (data.length % num)) % num;
    for (let i = 0; i < offset; ++i) {
        data.push({});
    }

    return {
        type: GET_ACHIEVEMENTS,
        payload: data
    };
};
