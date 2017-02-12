import { 
    ANSWER_MODAL_VISIBLE
} from './types';

export const answerModalVisible = (visible) => {
    return { 
        type: ANSWER_MODAL_VISIBLE,
        payload: visible 
    };  
};
