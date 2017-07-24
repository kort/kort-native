import reducer from '../../src/reducers/AnswerReducer';
import * as types from '../../src/actions/types';

describe('answer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
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
        solutionSent: false
      }
    );
  });

  it('should show new achievments index', () => {
    expect(
      reducer([], {
        type: types.SHOW_NEW_ACHIEVEMENTS,
        payload: 3
      })
    ).toEqual(
      {
        currentAchievementIndex: 3
      }
    );
  });

it('should reset solution sent', () => {
    expect(
      reducer([], {
        type: types.RESET_SOLUTION_SENT,
        payload: null
      })
    ).toEqual(
      {
        solutionSent: false
      }
    );
});

it('should reset solution sent', () => {
    expect(
      reducer([], {
        type: types.SOLUTION_SUCCESS,
        payload: {
            modalType: 'win',
            modalText: 'sometext',
            response: 'response'
        }
      })
    ).toEqual(
        {
            sending: false,
            modalVisible: true, 
            modalConfirm: false,
            modalType: 'win',
            modalText: 'sometext',
            newAchievements: 'response',
            solutionSent: true       
        }
    );
});

it('should reset sending', () => {
    expect(
      reducer([], {
        type: types.SOLUTION_FAIL,
        payload: 'error'
      })
    ).toEqual(
      {
        errorMsg: 'error',
        sending: false
      }
    );
});

it('should send solution', () => {
    expect(
      reducer([], {
        type: types.SEND_SOLUTION,
        payload: 'error'
      })
    ).toEqual(
      {
        sending: true
      }
    );
});

it('should set answermodalvisible true', () => {
    expect(
      reducer([], {
        type: types.ANSWER_MODAL_VISIBLE,
        payload: true
      })
    ).toEqual(
      {
        answerModalVisible: true
      }
    );
});

it('should hide modal', () => {
    expect(
      reducer([], {
        type: types.HIDE_MODAL,
        payload: false
      })
    ).toEqual(
      {
        errorMsg: null,
        modalType: '',
        modalVisible: false
      }
    );
});

it('should show modal', () => {
    expect(
      reducer([], {
        type: types.SHOW_MODAL,
        payload: {
            modalConfirm: true,
            modalText: 'someText',
            modalType: 'win' 
        }
      })
    ).toEqual(
      {
        modalVisible: true, 
        modalConfirm: true,
        modalText: 'someText',
        modalType: 'win' 
      }
    );
});

it('should hide modal', () => {
    expect(
      reducer([], {
        type: types.SELECTED_ANSWER,
        payload: 'answer'
      })
    ).toEqual(
      {
        selectedAnswer: 'answer'
      }
    );
});

it('should answer be freetext', () => {
    expect(
      reducer([], {
        type: types.ANSWER_FREETEXT_AVAILABLE,
        payload: 'answer'
      })
    ).toEqual(
      {
        freetextType: 'answer'
      }
    );
});

it('should set answer', () => {
    expect(
      reducer([], {
        type: types.ANSWER_SET,
        payload: {
            answer: 'answer', 
            option: 3 
        }
      })
    ).toEqual(
    {
        answer: 'answer', 
        selectedOption: 3      
    }
    );
});
});
