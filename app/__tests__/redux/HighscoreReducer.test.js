import reducer from '../../src/reducers/HighscoreReducer';
import * as types from '../../src/actions/types';

describe('highscore reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        highscore: {},
        currentTab: 0,
        loading: false,
        downloading: false,
        errorMsg: null
      }
    );
  });

  it('should download highscore', () => {
    expect(
      reducer([], {
        type: types.HIGHSCORE_DOWNLOAD,
        payload: true
      })
    ).toEqual(
      {
        loading: true,
        downloading: true
    }
    );
  });

it('should set download successful', () => {
    expect(
      reducer([], {
        type: types.HIGHSCORE_DOWNLOADED_SUCCESS,
        payload: []
      })
    ).toEqual(
      {
        loading: false,
        downloading: false,
        highscore: []
    }
    );
  });

it('should set download successful', () => {
    expect(
      reducer([], {
        type: types.HIGHSCORE_DOWNLOADED_ERROR,
        payload: 'errorMsg'
      })
    ).toEqual(
      {
        loading: false,
        downloading: false,
        errorMsg: 'errorMsg'
    }
    );
  });

it('should clear errorMsg', () => {
    expect(
      reducer([], {
        type: types.HIGHSCORE_CLEAR_ERROR_MSG,
        payload: ''
      })
    ).toEqual(
      {
        errorMsg: ''
    }
    );
  });

it('should change tab index', () => {
    expect(
      reducer([], {
        type: types.TAB_CHANGED,
        payload: 3
      })
    ).toEqual(
      {
        currentTab: 3
    }
    );
  });
});
