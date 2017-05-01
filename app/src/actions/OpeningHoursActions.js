import _ from 'lodash';
import { 
    SHOW_FROM_TIME_MODAL,
    SHOW_TO_TIME_MODAL,
    SHOW_DAYS_SELECTION_MODAL,
    TO_TIME,
    FROM_TIME,
    DAYS
} from './types';
import OpeningHoursRepresentation from '../date/OpeningHoursRepresentation';


export const showFromTimeModal = (value) => {
    return { 
        type: SHOW_FROM_TIME_MODAL,
        payload: value 
    };  
};

export const showToTimeModal = (value) => {
    return { 
        type: SHOW_TO_TIME_MODAL,
        payload: value 
    };  
};

export const showDaysSelectionModal = (value) => {
    return { 
        type: SHOW_DAYS_SELECTION_MODAL,
        payload: value 
    };  
};

export const setFromTime = (value) => {
    return { 
        type: FROM_TIME,
        payload: value 
    };  
};

export const setToTime = (value) => {
    return { 
        type: TO_TIME,
        payload: value 
    };  
};

export const setDays = (value) => {
    const dayValues = _(value)
        .map('value')
        .value();
    return { 
        type: DAYS,
        payload: [value, OpeningHoursRepresentation(dayValues)] 
    };  
};
