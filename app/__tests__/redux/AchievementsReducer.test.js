import reducer from '../../src/reducers/AchievementsReducer';
import * as types from '../../src/actions/types';

describe('achievements reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        achievements: {},
        loading: false,
        downloading: false,
        errorMsg: null
      }
    );
  });

  it('should clear error msg', () => {
    expect(
      reducer([], {
        type: types.ACHIEVEMENTS_CLEAR_ERROR_MSG,
        payload: null
      })
    ).toEqual(
      {
        errorMsg: null
      }
    );
  });
});
