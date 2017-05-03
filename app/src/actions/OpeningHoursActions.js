import _ from 'lodash';
import { 
    ADD_NEW_OH_ENTRY,
    SHOW_FROM_TIME_MODAL,
    SHOW_TO_TIME_MODAL,
    SHOW_DAYS_SELECTION_MODAL,
    TO_TIME,
    FROM_TIME,
    DAYS
} from './types';
import OpeningHoursRepresentation from '../date/OpeningHoursRepresentation';

export const addNewEntry = () => {
    return { 
        type: ADD_NEW_OH_ENTRY
    };  
};

export const showFromTimeModal = (value, row, col) => {
    console.log(value, row, col);
    return { 
        type: SHOW_FROM_TIME_MODAL,
        payload: value,
        index: [row, col]
    };  
};

export const showToTimeModal = (value, row, col) => {
    return { 
        type: SHOW_TO_TIME_MODAL,
        payload: value,
        index: [row, col]
    };  
};

export const showDaysSelectionModal = (value, row) => {
    return { 
        type: SHOW_DAYS_SELECTION_MODAL,
        payload: value,
        index: row
    };  
};

export const setFromTime = (value, row, col) => {
    return { 
        type: FROM_TIME,
        payload: value,
        index: [row, col]
    };  
};

export const setToTime = (value, row, col) => {
    return { 
        type: TO_TIME,
        payload: value,
        index: [row, col]
    };  
};

export const setDays = (value, row) => {
    console.log('day index ', value);
    const dayValues = _(value)
        .map('value')
        .value();
    return { 
        type: DAYS,
        payload: [value, OpeningHoursRepresentation(dayValues)],
        index: row
    };  
};
