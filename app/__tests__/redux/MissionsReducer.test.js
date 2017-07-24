import reducer from '../../src/reducers/MissionsReducer';
import * as types from '../../src/actions/types';

describe('missions reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        activeMission: {},
        missionAnnotations: [],
        missionsData: [],
        missionsLoading: false,
        coordsOfDownload: { latitude: 0, longitude: 0 },
        errorMsg: null,
        missionViewHeight: 300,
        missionViewVisible: false
      }
    );
  });

it('should show mission', () => {
    expect(
      reducer([], {
        type: types.SHOW_MISSION,
        payload: true
      })
    ).toEqual(
      {
        missionViewVisible: true
      }
    );
  });

it('should download missions', () => {
    expect(
      reducer([], {
        type: types.MISSIONS_DOWNLOAD,
        payload: true
      })
    ).toEqual(
    {
        missionsLoading: true
    }
    );
  });

it('should give error', () => {
    expect(
      reducer([], {
        type: types.MISSIONS_DOWNLOADED_ERROR,
        payload: 'error'
      })
    ).toEqual(
    {
        missionsLoading: false,
        errorMsg: 'error'
    }
    );
  });

it('should give success', () => {
    expect(
      reducer([], {
        type: types.MISSIONS_DOWNLOADED_SUCCESS,
        payload: {
            data: 'data',
            coords: { latitude: 47.0, longitude: 8.2 }
        }
      })
    ).toEqual(
    {
        missionsLoading: false, 
        missionsData: 'data', 
        coordsOfDownload: { latitude: 47.0, longitude: 8.2 },
        missionAnnotations: [{
      		annotationImage: {
      			height: 30,
      			source: {
      				uri: 'undefined'
      			},
      			width: 30
      		},
      		coordinates: undefined,
      		id: undefined,
      		title: undefined,
      		type: 'point'
      	}, {
      		annotationImage: {
      			height: 30,
      			source: {
      				uri: 'undefined'
      			},
      			width: 30
      		},
      		coordinates: undefined,
      		id: undefined,
      		title: undefined,
      		type: 'point'
      	}, {
      		annotationImage: {
      			height: 30,
      			source: {
      				uri: 'undefined'
      			},
      			width: 30
      		},
      		coordinates: undefined,
      		id: undefined,
      		title: undefined,
      		type: 'point'
      	}, {
      		annotationImage: {
      			height: 30,
      			source: {
      				uri: 'undefined'
      			},
      			width: 30
      		},
      		coordinates: undefined,
      		id: undefined,
      		title: undefined,
      		type: 'point'
      	}],
    }


    );
  });

it('should start mission', () => {
    expect(
      reducer([], {
        type: types.START_MISSION,
        payload: {
            mission: 'mission',
            height: 400
        }
      })
    ).toEqual(
    {
        activeMission: 'mission', 
        missionViewHeight: 400
    }
    );
  });

it('should clear error msg', () => {
    expect(
      reducer([], {
        type: types.MISSIONS_CLEAR_ERROR_MSG,
        payload: null
      })
    ).toEqual(
    {
        errorMsg: null
    }
    );
  });
});
