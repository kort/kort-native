import {
    ANSWER_MODAL_VISIBLE
 } from '../actions/types';

const INITIAL_STATE = {
    answerModalVisible: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ANSWER_MODAL_VISIBLE:
            return { ...state, answerModalVisible: action.payload };
        default:
            return state;
    }
};
