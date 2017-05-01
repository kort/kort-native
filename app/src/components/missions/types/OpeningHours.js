import React, { Component } from 'react';
import {
    View,
    Text
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
        const { rowStyle, dayColStyle, deleteColStyle, timeColStyle } = styles;
        return (
            <View>
                {/*<DaySelection
                    options={days}
                />
                <TimeRangeSelection />            */}
                <View style={rowStyle}>
                <View style={deleteColStyle}><Text>X</Text></View>
                <View style={dayColStyle}>
                    <DaySelection
                    options={days}
                    />
                </View>
                <View style={timeColStyle}>
                    <TimeRangeSelection />
                </View>
                <View style={timeColStyle}>
                    <TimeRangeSelection />
                </View>
                </View>
                <View style={rowStyle}>
                <View style={deleteColStyle}><Text>X</Text></View>
                <View style={dayColStyle}><Text>Mo,Do,Fr,Su</Text></View>
                <View style={timeColStyle}><Text>08:00-12:00</Text></View>
                <View style={timeColStyle}><Text>+</Text></View>
                </View>
                <View style={rowStyle}>
                <View style={deleteColStyle}><Text>X</Text></View>
                <View style={dayColStyle}><Text>Mo,Do,Fr,Su</Text></View>
                <View style={timeColStyle}><Text>08:00-12:00</Text></View>
                <View style={timeColStyle}><Text>+</Text></View>
                </View>
                <View style={rowStyle}>
                <View style={deleteColStyle}><Text>X</Text></View>
                <View style={dayColStyle}><Text>Mo,Do,Fr,Su</Text></View>
                <View style={timeColStyle}><Text>08:00-12:00</Text></View>
                <View style={timeColStyle}><Text>+</Text></View>
                </View>
            </View>
        );
    }
}

const styles = {
    rowStyle: {
        backgroundColor: 'red',
        flexDirection: 'row',
        paddingBottom: 2,
        paddingTop: 2,
    },
    deleteColStyle: {
        backgroundColor: 'green',
        width: 30,
    },
    dayColStyle: {
        backgroundColor: 'yellow',
        width: 100
    },
    timeColStyle: {
        backgroundColor: 'cyan',
        width: 100
    }
};

export default (OpeningHours);
