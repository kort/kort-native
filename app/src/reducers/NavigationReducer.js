import {
   LEFT_CLICK,
   RIGHT_CLICK
 } from '../actions/types';

const INITIAL_STATE = {
    leftClicked: false,
    rightClicked: false,
    currentView: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LEFT_CLICK:
            return { ...state, leftClicked: action.payload.show, currentView: action.payload.view };
        case RIGHT_CLICK:
            return { ...state, rightClicked: action.payload.show, currentView: action.payload.view };
        default:
            return state;
    }
};
