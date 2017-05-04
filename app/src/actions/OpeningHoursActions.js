import _ from 'lodash';
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
} from './types';
import OpeningHoursRepresentation from '../date/OpeningHoursRepresentation';

export const addNewEntry = () => {
    return { 
        type: ADD_NEW_OH_ENTRY
    };  
};

export const addNewTimeRange = (row) => {
    return { 
        type: ADD_NEW_OH_TIME_RANGE,
        payload: row
    };  
};

export const removeEntry = (row) => {
    return { 
        type: DELETE_OH_ENTRY,
        payload: row
    };  
};

export const showFromTimeModal = (value, row, col) => {
    console.log(value, row, col);
    return { 
        type: SHOW_FROM_TIME_MODAL,
        payload: {
            value,
            index: {
                row,
                col
            }
        }
    };  
};

export const showToTimeModal = (value, row, col) => {
    return { 
        type: SHOW_TO_TIME_MODAL,
        payload: {
            value,
            index: {
                row,
                col
            }
        }
    };  
};

export const showDaysSelectionModal = (value, row) => {
    return { 
        type: SHOW_DAYS_SELECTION_MODAL,
        payload: {
            value,
            index: row
        }
    };  
};

export const setFromTime = (value, row, col) => {
    return { 
        type: FROM_TIME,
        payload: {
            value,
            index: {
                row,
                col
            }
        }
    };  
};

export const setToTime = (value, row, col) => {
    return { 
        type: TO_TIME,
        payload: {
            value,
            index: {
                row,
                col
            }
        }
    };  
};

export const setDays = (value, row) => {
    const dayValues = _(value)
        .map('value')
        .value();
    let rawValue = value;
    let formattedDays = '';
    let additionalValues = '';
    const index = dayValues.indexOf(10);
    if (index !== -1) {
        dayValues.splice(index, 1);
        if (dayValues.length !== 0) {
            additionalValues = ',';
        }
        additionalValues += 'PH';
    }
    if (dayValues.indexOf(11) !== -1) {
        rawValue = removeExcept(value, 11);
        formattedDays = '24/7';
    } else {
        formattedDays = `${OpeningHoursRepresentation(dayValues)}${additionalValues}`;
    }
    return { 
        type: DAYS,
        payload: {
            value: rawValue,
            formattedDays,
            index: row
        }
    };  
};

const removeExcept = (array, element) => {
    return array.filter(e => e.value === element);
};
