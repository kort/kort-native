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


    shuffle(data);
   
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

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}