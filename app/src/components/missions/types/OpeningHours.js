import React, { Component } from 'react';
import {
    View
} from 'react-native';
import TimeRangeSelection from './TimeRangeSelection';
import DaySelection from './DaySelection';

const days = [
    { value: 0, label: 'Monday' },
    { value: 1, label: 'Tuesday' },
    { value: 2, label: 'Wednesday' },
    { value: 3, label: 'Thursday' },
    { value: 4, label: 'Friday' },
    { value: 5, label: 'Saturday' },
    { value: 6, label: 'Sunday' }
];


class OpeningHours extends Component {

    render() {
        return (
            <View>
                <DaySelection
                    options={days}
                />
                <TimeRangeSelection />            
            </View>
        );
    }
}

const styles = {
    bgColor: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#395971',
        flex: 1,
    }
};

export default (OpeningHours);
