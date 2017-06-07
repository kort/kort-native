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
    selectedOption: '',
    modalVisible: false,
    modalConfirm: false,
    modalText: '',
    modalType: '',
    answerModalVisible: false,
    sending: false,
    newAchievements: {},
    currentAchievementIndex: -1,
    errorMsg: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_NEW_ACHIEVEMENTS:
            return { ...state, currentAchievementIndex: action.payload };          
        case SOLUTION_SUCCESS:
            return { ...state, 
                sending: false,
                modalVisible: true, 
                modalConfirm: false,
                modalType: action.payload.modalType,
                modalText: action.payload.modalText,
                newAchievements: action.payload.response };
        case SOLUTION_FAIL:
            return { ...state, sending: false, errorMsg: action.payload };
        case SEND_SOLUTION:
            return { ...state, sending: true };
        case ANSWER_MODAL_VISIBLE:
            return { ...state, answerModalVisible: action.payload };
        case HIDE_MODAL:
            return { ...state, errorMsg: null, modalVisible: action.payload };
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
            return { ...state, 
                answer: action.payload.answer, 
                selectedOption: action.payload.option };
        default:
            return state;
    }
};
