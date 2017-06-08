import {
   LEFT_CLICK,
   RIGHT_CLICK,
   UPDATE_VIEW_ACHIEVEMENTS,
   UPDATE_VIEW_HIGHSCORE,
   UPDATE_VIEW_PROFILE
 } from '../actions/types';

const INITIAL_STATE = {
    leftClicked: false,
    rightClicked: false,
    currentView: '',
    updateAchievementsView: false,
    updateProfileView: false,
    updateHighscoreView: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LEFT_CLICK:
            return { ...state, leftClicked: action.payload.show, currentView: action.payload.view };
        case RIGHT_CLICK:
            return { ...state, rightClicked: action.payload.show, currentView: action.payload.view };
        case UPDATE_VIEW_ACHIEVEMENTS:
            return { ...state, updateAchievementsView: action.payload };
        case UPDATE_VIEW_HIGHSCORE:
            return { ...state, updateHighscoreView: action.payload };
        case UPDATE_VIEW_PROFILE:
            return { ...state, updateProfileView: action.payload };
        default:
            return state;
    }
};
