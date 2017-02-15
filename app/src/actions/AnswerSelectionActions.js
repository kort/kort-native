import { 
    ANSWER_MODAL_VISIBLE,
    SELECTED_ANSWER,
    ANSWER_FREETEXT_AVAILABLE,
    ANSWER_SELECTION_AVAILABLE,
    ANSWER_SET
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

export const selectionAvailable = (available) => {
        return { 
        type: ANSWER_SELECTION_AVAILABLE,
        payload: available 
    }; 
};

export const freetextAvailable = (available) => {
        return { 
        type: ANSWER_FREETEXT_AVAILABLE,
        payload: available 
    }; 
};
