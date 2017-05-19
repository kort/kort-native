import { 
    SELECTED_ANSWER,
    ANSWER_FREETEXT_AVAILABLE,
    ANSWER_SET,
    HIDE_MODAL,
    SHOW_MODAL,
    ANSWER_MODAL_VISIBLE

} from './types';

export const answerModalVisible = (visible) => {
    return { 
        type: ANSWER_MODAL_VISIBLE,
        payload: visible 
    };  
};

export const answerSet = (answer) => {
        console.log('answer set: ', answer);
    return { 
        type: ANSWER_SET,
        payload: answer 
    };  
};

export const selectedAnswer = (answer) => {
    return { 
        type: SELECTED_ANSWER,
        payload: answer 
    };  
};

export const setFreetextAvailable = (freetextType) => {
        return { 
        type: ANSWER_FREETEXT_AVAILABLE,
        payload: freetextType 
    }; 
};

export const hideModal = (hide) => {
        return { 
        type: HIDE_MODAL,
        payload: !hide 
    }; 
};

export const showModal = (modalConfirm, modalText, modalType) => {
        return { 
        type: SHOW_MODAL,
        payload: {
            modalConfirm,
            modalText,
            modalType
        } 
    }; 
};


