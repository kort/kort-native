import {
    SELECTED_ANSWER,
    ANSWER_FREETEXT_AVAILABLE,
    ANSWER_SET,
    HIDE_MODAL,
    SHOW_MODAL,
    ANSWER_MODAL_VISIBLE,
    SOLUTION_FAIL,
    SOLUTION_SUCCESS,
    SEND_SOLUTION,
    SHOW_NEW_ACHIEVEMENTS
 } from '../actions/types';

const INITIAL_STATE = {
    selectedAnswer: null,
    freetextType: '',
    answer: '',
    modalVisible: false,
    modalConfirm: false,
    modalText: '',
    modalType: '',
    answerModalVisible: false,
    sending: false,
    newAchievements: {},
    currentAchievementIndex: -1,
    errorMsg: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_NEW_ACHIEVEMENTS:
            return { ...state, currentAchievementIndex: action.payload };
        case SOLUTION_SUCCESS:
            return { ...state, 
                modalVisible: true, 
                modalType: 'win',
                modalText: action.payload.modalText,
                newAchievements: action.payload.response };
        case SOLUTION_FAIL:
            return { ...state, errorMsg: action.payload };
        case SEND_SOLUTION:
            return { ...state, sending: true };
        case ANSWER_MODAL_VISIBLE:
            return { ...state, answerModalVisible: action.payload };
        case HIDE_MODAL:
            return { ...state, modalVisible: action.payload };
        case SHOW_MODAL:
            return { ...state, 
                modalVisible: true, 
                modalConfirm: action.payload.modalConfirm,
                modalText: action.payload.modalText,
                modalType: action.payload.modalType };
        case SELECTED_ANSWER:
            return { ...state, selectedAnswer: action.payload };
        case ANSWER_FREETEXT_AVAILABLE:
            return { ...state, freetextType: action.payload };
        case ANSWER_SET:
            return { ...state, answer: action.payload };
        default:
            return state;
    }
};
