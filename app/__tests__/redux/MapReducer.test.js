import reducer from '../../src/reducers/MapReducer';
import * as types from '../../src/actions/types';

describe('map reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        mapModeFullScreen: false,
        currentLocation: { latitude: 0, longitude: 0 },
        accuracyThresholdReached: false,
        centerCoordinates: { latitude: 0, longitude: 0 }
      }
    );
  });

  it('should toggle mapmode', () => {
    expect(
      reducer([], {
        type: types.TOGGLE_MAPMODE_FULLSCREEN,
        payload: true
      })
    ).toEqual(
      {
        mapModeFullScreen: true
    }
    );
  });

it('should update location', () => {
    expect(
      reducer([], {
        type: types.LOCATION_UPDATE,
        payload: { latitude: 77.0, longitude: 34.2 }
      })
    ).toEqual(
      {
        currentLocation: { latitude: 77.0, longitude: 34.2 }
    }
    );
  });

it('should set accuracy threshold reached', () => {
    expect(
      reducer([], {
        type: types.LOCATION_ACCURACY_INSUFFICIENT,
        payload: true
      })
    ).toEqual(
      {
        accuracyThresholdReached: true
    }
    );
  });

it('should update center coordinates', () => {
    expect(
      reducer([], {
        type: types.UPDATE_CENTER_COORDINATES,
        payload: { latitude: 77.0, longitude: 34.2 }
      })
    ).toEqual(
      {
        centerCoordinates: { latitude: 77.0, longitude: 34.2 }
    }
    );
  });
});
