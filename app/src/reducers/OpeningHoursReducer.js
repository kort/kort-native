import {
    SHOW_FROM_TIME_MODAL,
    SHOW_TO_TIME_MODAL,
    SHOW_DAYS_SELECTION_MODAL,
    TO_TIME,
    FROM_TIME,
    DAYS
 } from '../actions/types';

const INITIAL_STATE = {
    fromTimeModalVisible: false,
    toTimeModalVisible: false,
    daysSelectionModalVisible: false,
    fromTime: 'From',
    toTime: 'To',
    days: [],
    formattedDays: 'Days'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_FROM_TIME_MODAL:
            return { ...state, fromTimeModalVisible: action.payload };
        case SHOW_TO_TIME_MODAL:
            return { ...state, toTimeModalVisible: action.payload };
        case SHOW_DAYS_SELECTION_MODAL:
            return { ...state, daysSelectionModalVisible: action.payload };
        case FROM_TIME:
            return { ...state, fromTime: action.payload, fromTimeModalVisible: false };
            case TO_TIME:
            return { ...state, toTime: action.payload, toTimeModalVisible: false };
        case DAYS:
            return { ...state, days: action.payload[0], formattedDays: action.payload[1] };
        default:
            return state;
    }
};
