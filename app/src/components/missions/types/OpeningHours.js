import React, { Component } from 'react';
import {
    View,
    Text,
    ListView
} from 'react-native';
import { connect } from 'react-redux';
import TimeRangeSelection from './TimeRangeSelection';
import DaySelection from './DaySelection';
import { ButtonWithIcon } from '../../common';
import { showDaysSelectionModal, setDays, setFromTime, 
    setToTime, showFromTimeModal, showToTimeModal, addNewEntry } from '../../../actions/OpeningHoursActions';

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

    renderTimeRange(timeRangeData, row, col) {
        return (
            <View style={styles.timeColStyle}>
                    <TimeRangeSelection
                        data={timeRangeData}
                        row={row}
                        col={col}
                    />
                </View>
        );
    }

    renderRow(rowData) {
        console.log('row', rowData);
        const { rowStyle, dayColStyle, deleteColStyle, timeColStyle } = styles;
        return (
            <View style={rowStyle}>
                    <View style={deleteColStyle}>
                        <ButtonWithIcon 
                            iconName='ios-remove-circle' 
                            onPress={() => console.log('remove')} 
                        />
                    </View>
                    <View style={dayColStyle}>
                        <DaySelection
                        options={days}
                        data={rowData}
                        />
                    </View>
                    {this.renderTimeRange(rowData.timeRangeEntries[0], rowData.row, 0)}
                    {this.renderTimeRange(rowData.timeRangeEntries[1], rowData.row, 1)}
                </View>
        );
    }

    render() {
        return (
            
            <View>
            <ListView 
                dataSource={this.props.dataSource}
                renderRow={(rowData) => this.renderRow(rowData)}
                enableEmptySections
            /> 
            <ButtonWithIcon 
                            iconName='ios-add-circle' 
                            onPress={() => this.props.addNewEntry()} 
                        />
            </View>
        );
    }
}

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const styles = {
    rowStyle: {
        flexDirection: 'row',
        paddingBottom: 2,
        paddingTop: 2,
        height: 30
    },
    deleteColStyle: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dayColStyle: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timeColStyle: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
};

const mapStateToProps = ({ openingHoursReducer }) => {
    console.log('oh reducer', openingHoursReducer);
    const { entries } = openingHoursReducer;
    return { dataSource: dataSource.cloneWithRows(entries) };
};

export default connect(mapStateToProps, 
{showDaysSelectionModal, setDays, setFromTime, setToTime, showFromTimeModal, showToTimeModal, addNewEntry })(OpeningHours);