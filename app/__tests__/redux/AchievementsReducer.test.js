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

  it('download achievements', () => {
    expect(
      reducer([], {
        type: types.ACHIEVEMENTS_DOWNLOAD,
        payload: true
      })
    ).toEqual(
      {
        downloading: true,
        loading: true
      }
    );
  });

    it('download error', () => {
    expect(
      reducer([], {
        type: types.ACHIEVEMENTS_DOWNLOADED_ERROR,
        payload: 'error'
      })
    ).toEqual(
      {
        downloading: false,
        errorMsg: 'error',
        loading: false
      }
    );
  });

  it('download success', () => {
    expect(
      reducer([], {
        type: types.ACHIEVEMENTS_DOWNLOADED_SUCCESS,
        payload: {}
      })
    ).toEqual(
      {
        downloading: false,
        loading: false,
        achievements: {}
      }
    );
  });
});
