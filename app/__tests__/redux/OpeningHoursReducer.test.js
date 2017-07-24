import reducer from '../../src/reducers/OpeningHoursReducer';
import * as types from '../../src/actions/types';

describe('oh reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        entries: [],
        elementRowCounter: 0,
        manuallyEdited: false
      }
    );
  });

  it('manually edited', () => {
    expect(
      reducer([], {
        type: types.MANUALLY_EDITED,
        payload: true
      })
    ).toEqual(
      {
        manuallyEdited: true
      }
    );
  });

    it('add oh entry', () => {
    expect(
      reducer([], {
        type: types.ADD_NEW_OH_ENTRY,
        payload: true
      })
    ).toEqual(
      {
        entries: [{
            timeRangeEntries: [{
                fromTime: '',
                toTime: '',
                fromTimeModalVisible: false,
                toTimeModalVisible: false,
                openEnd: false
            }],
            row: undefined,
            days: [],
            formattedDays: null,
            daysSelectionModalVisible: false
        }],
        elementRowCounter: NaN
      }
    );
  });
});
