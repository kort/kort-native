import reducer from '../../src/reducers/SettingsReducer';
import * as types from '../../src/actions/types';

describe('achievements reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        stats: false,
        mapRotation: false,
        appSettingsLoaded: false
      }
    );
  });

  it('should rotate map', () => {
    expect(
      reducer([], {
        type: types.MAP_ROTATION_CHANGED,
        payload: true
      })
    ).toEqual(
      {
        mapRotation: true
      }
    );
  });

  it('should change stats', () => {
    expect(
      reducer([], {
        type: types.STATS_CHANGED,
        payload: true
      })
    ).toEqual(
      {
        stats: true
      }
    );
  });

it('should load app settings', () => {
    expect(
      reducer([], {
        type: types.APP_SETTINGS_LOADED,
        payload: true
      })
    ).toEqual(
      {
        appSettingsLoaded: true
      }
    );
  });
});
