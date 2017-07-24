import reducer from '../../src/reducers/NavigationReducer';
import * as types from '../../src/actions/types';

describe('navigation reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        leftClicked: false,
        rightClicked: false,
        currentView: '',
        updateAchievementsView: false,
        updateProfileView: false,
        updateHighscoreView: false
      }
    );
  });

  it('should click left', () => {
    expect(
      reducer([], {
        type: types.LEFT_CLICK,
        payload: {
            show: true,
            view: 'view'
        }
      })
    ).toEqual(
      {
        leftClicked: true,
        currentView: 'view'
      }
    );
  });

  it('should click right', () => {
    expect(
      reducer([], {
        type: types.RIGHT_CLICK,
        payload: {
            show: true,
            view: 'view'
        }
      })
    ).toEqual(
      {
        rightClicked: true,
        currentView: 'view'
      }
    );
  });

it('should update view highscore', () => {
    expect(
      reducer([], {
        type: types.UPDATE_VIEW_HIGHSCORE,
        payload: true
      })
    ).toEqual(
      {
        updateHighscoreView: true
      }
    );
  });

it('should update view achievements', () => {
    expect(
      reducer([], {
        type: types.UPDATE_VIEW_ACHIEVEMENTS,
        payload: true
      })
    ).toEqual(
      {
        updateAchievementsView: true
      }
    );
  });

it('should update ivew profile', () => {
    expect(
      reducer([], {
        type: types.UPDATE_VIEW_PROFILE,
        payload: true
      })
    ).toEqual(
      {
        updateProfileView: true
      }
    );
  });
});
