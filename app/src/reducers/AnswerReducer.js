import {
    SELECTED_ANSWER,
    ANSWER_FREETEXT_AVAILABLE,
    ANSWER_SET,
    HIDE_MODAL,
    SHOW_MODAL,
    ANSWER_MODAL_VISIBLE
 } from '../actions/types';

//TODO selectedAnswer
const INITIAL_STATE = {
    selectedAnswer: null,
    freetextType: '',
    answer: '',
    modalVisible: false,
    modalConfirm: false,
    modalText: '',
    modalType: '',
    answerModalVisible: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
