import {
    ADD_NEW_OH_ENTRY,
    DELETE_OH_ENTRY,
    ADD_NEW_OH_TIME_RANGE,
    SHOW_FROM_TIME_MODAL,
    SHOW_TO_TIME_MODAL,
    SHOW_DAYS_SELECTION_MODAL,
    TO_TIME,
    FROM_TIME,
    DAYS
 } from '../actions/types';

 const INITIAL_STATE_TIME_RANGE_INSTANCE = {
    fromTime: 'From',
    toTime: 'To',
    fromTimeModalVisible: false,
    toTimeModalVisible: false,
};

const INITIAL_STATE_INSTANCE = {
    timeRangeEntries: [INITIAL_STATE_TIME_RANGE_INSTANCE],
    days: [],
    formattedDays: null,
    daysSelectionModalVisible: false
};

const INITIAL_STATE = {
    entries: [],
    elementRowCounter: 0
};

const createNewEntry = (elementNr) => {
    const newEntry = Object.assign({}, INITIAL_STATE_INSTANCE);
    newEntry.row = elementNr;
   return newEntry;
};

const createNewTimeRange = () => {
    const newEntry = Object.assign({}, INITIAL_STATE_TIME_RANGE_INSTANCE);
   return newEntry;
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_NEW_OH_ENTRY:
            return { ...state, 
                entries: [...state.entries, 
                createNewEntry(
                state.elementRowCounter)],
                elementRowCounter: state.elementRowCounter + 1 };
        case DELETE_OH_ENTRY:
            return { ...state, 
                entries: [...state.entries.filter(
                    (el) => { return el.row !== action.payload; }
            )] };
        case ADD_NEW_OH_TIME_RANGE:
                    return { ...state, 
            entries: state.entries.map(
                    (entry) => entry.row === action.payload ? { ...entry, 
                        timeRangeEntries: [...entry.timeRangeEntries, createNewTimeRange()], 
                     } : entry, action.payload)
             };
        case SHOW_FROM_TIME_MODAL:
            return { ...state, 
                entries: state.entries.map(
                    (entry) => entry.row === action.payload.index.row ? { ...entry, 
                    timeRangeEntries: state.entries[findWithAttr(state.entries, 'row', action.payload.index.row)].timeRangeEntries.map(
                    (timeRangeEntry, j) => j === action.payload.index.col ? { ...timeRangeEntry, fromTimeModalVisible: action.payload.value }
                    : timeRangeEntry, action.payload.index.col)   
                    } : entry, action.payload.index.row)
                };
        case SHOW_TO_TIME_MODAL:
            return { ...state, 
                entries: state.entries.map(
                    (entry) => entry.row === action.payload.index.row ? { ...entry, 
                    timeRangeEntries: state.entries[findWithAttr(state.entries, 'row', action.payload.index.row)].timeRangeEntries.map(
                    (timeRangeEntry, j) => j === action.payload.index.col ? { ...timeRangeEntry, toTimeModalVisible: action.payload.value }
                    : timeRangeEntry, action.payload.index.col)    
                    } : entry, action.payload.index.row)
                };
        case SHOW_DAYS_SELECTION_MODAL:
            return { ...state, 
            entries: state.entries.map(
                    (entry) => entry.row === action.payload.index ? { ...entry, 
                        daysSelectionModalVisible: action.payload.value, 
                     } : entry, action.payload.index)
             };
        case FROM_TIME:
            return { ...state, 
                entries: state.entries.map(
                    (entry) => entry.row === action.payload.index.row ? { ...entry, 
                    timeRangeEntries: state.entries[findWithAttr(state.entries, 'row', action.payload.index.row)].timeRangeEntries.map(
                    (timeRangeEntry, j) => j === action.payload.index.col ? { ...timeRangeEntry, fromTime: action.payload.value, fromTimeModalVisible: false }
                    : timeRangeEntry, action.payload.index.col)    
                    } : entry, action.payload.index.row)
                };
            case TO_TIME:
            return { ...state, 
                entries: state.entries.map(
                    (entry) => entry.row === action.payload.index.row ? { ...entry,
                    timeRangeEntries: state.entries[findWithAttr(state.entries, 'row', action.payload.index.row)].timeRangeEntries.map(
                    (timeRangeEntry, j) => j === action.payload.index.col ? { ...timeRangeEntry, toTime: action.payload.value, toTimeModalVisible: false }
                    : timeRangeEntry, action.payload.index.col)
                    } : entry, action.payload.index.row)
                };
        case DAYS:
            return { ...state,
                entries: state.entries.map(
                    (entry) => entry.row === action.payload.index ? { ...entry, 
                        days: action.payload.value, 
                        formattedDays: action.payload.formattedDays !== '' ? action.payload.formattedDays : INITIAL_STATE.formattedDays
                     } : entry, action.payload.index)
                };
        default:
            return state;
    }
};

function findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
