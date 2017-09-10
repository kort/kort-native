import I18n from 'react-native-i18n';
import { 
    SELECTED_ANSWER,
    ANSWER_FREETEXT_AVAILABLE,
    ANSWER_SET,
    HIDE_MODAL,
    SHOW_MODAL,
    ANSWER_MODAL_VISIBLE,
    SEND_SOLUTION,
    SOLUTION_SUCCESS,
    SOLUTION_FAIL,
    SHOW_NEW_ACHIEVEMENTS,
    RESET_SOLUTION_SENT
} from './types';
import KortAPI from '../data/KortAPI';

export const answerModalVisible = (visible) => {
    return { 
        type: ANSWER_MODAL_VISIBLE,
        payload: visible 
    };  
};

export const answerSet = (answer, option) => {
        console.log('answer set: ', answer, option);
    return { 
        type: ANSWER_SET,
        payload: { answer, option } 
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

export const solveMission = (user, mission, value, option, solved, additionalKoins) => {
    return (dispatch) => {  
    dispatch({ type: SEND_SOLUTION });
    const api = new KortAPI(user.secret);
        const newKoinCount = additionalKoins !== 0 ?
         `${mission.koinReward} + ${additionalKoins}` : mission.koinReward;
        const solution = {
            stats_enabled: additionalKoins !== 0,
            osm_id: mission.osmId,
            solved,
            userId: user.id,
            value,
            option
        };
        api.sendSolution(mission.schema, mission.errorId, solution)
            .then(response => {
                if (solved) {
                    dispatch({ 
                        type: SOLUTION_SUCCESS,
                        payload: {
                            response,
                            modalType: 'win',
                            modalText: I18n.t('mission_message_reward', 
                            { koinReward: mission.koinRewardWhenComplete, koins: newKoinCount })
                        }
                    });
                } else {
                    dispatch({ 
                        type: SOLUTION_SUCCESS,
                        payload: {
                            response,
                            modalType: 'unsolved',
                            modalText: I18n.t('mission_message_unsolved')
                        }
                    });
                }    
            })
            .catch(errorMsg => {
                dispatch({ 
                    type: SOLUTION_FAIL,
                    payload: errorMsg 
                });
            });
    };
};

export const showAchievements = (show) => {
        return { 
        type: SHOW_NEW_ACHIEVEMENTS,
        payload: show 
    }; 
};

export const resetSolutionSent = () => {
        return { 
        type: RESET_SOLUTION_SENT
    }; 
};
