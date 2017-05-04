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
                    (entry) => entry.row === action.index ? { ...entry, 
                        timeRangeEntries: [...entry.timeRangeEntries, INITIAL_STATE_TIME_RANGE_INSTANCE], 
                     } : entry, action.index)
             };
        case SHOW_FROM_TIME_MODAL:
            return { ...state, 
                entries: state.entries.map(
                    (entry) => entry.row === action.index[0] ? { ...entry, 
                    timeRangeEntries: state.entries[findWithAttr(state.entries, 'row', action.index[0])].timeRangeEntries.map(
                    (timeRangeEntry, j) => j === action.index[1] ? { ...timeRangeEntry, fromTimeModalVisible: action.payload }
                    : timeRangeEntry, action.index[1])   
                    } : entry, action.index[0])
                };
        case SHOW_TO_TIME_MODAL:
            return { ...state, 
                entries: state.entries.map(
                    (entry) => entry.row === action.index[0] ? { ...entry, 
                    timeRangeEntries: state.entries[findWithAttr(state.entries, 'row', action.index[0])].timeRangeEntries.map(
                    (timeRangeEntry, j) => j === action.index[1] ? { ...timeRangeEntry, toTimeModalVisible: action.payload }
                    : timeRangeEntry, action.index[1])    
                    } : entry, action.index[0])
                };
        case SHOW_DAYS_SELECTION_MODAL:
            return { ...state, 
            entries: state.entries.map(
                    (entry) => entry.row === action.index ? { ...entry, 
                        daysSelectionModalVisible: action.payload, 
                     } : entry, action.index)
             };
        case FROM_TIME:
            return { ...state, 
                entries: state.entries.map(
                    (entry) => entry.row === action.index[0] ? { ...entry, 
                    timeRangeEntries: state.entries[findWithAttr(state.entries, 'row', action.index[0])].timeRangeEntries.map(
                    (timeRangeEntry, j) => j === action.index[1] ? { ...timeRangeEntry, fromTime: action.payload, fromTimeModalVisible: false }
                    : timeRangeEntry, action.index[1])    
                    } : entry, action.index[0])
                };
            case TO_TIME:
            return { ...state, 
                entries: state.entries.map(
                    (entry) => entry.row === action.index[0] ? { ...entry,
                    timeRangeEntries: state.entries[findWithAttr(state.entries, 'row', action.index[0])].timeRangeEntries.map(
                    (timeRangeEntry, j) => j === action.index[1] ? { ...timeRangeEntry, toTime: action.payload, toTimeModalVisible: false }
                    : timeRangeEntry, action.index[1])
                    } : entry, action.index[0])
                };
        case DAYS:
            return { ...state,
                entries: state.entries.map(
                    (entry) => entry.row === action.index ? { ...entry, 
                        days: action.payload[0], 
                        formattedDays: action.payload[1] !== '' ? action.payload[1] : INITIAL_STATE.formattedDays
                     } : entry, action.index)
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
