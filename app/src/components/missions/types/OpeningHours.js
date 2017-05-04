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
    setToTime, showFromTimeModal, showToTimeModal, addNewEntry, removeEntry, addNewTimeRange } from '../../../actions/OpeningHoursActions';

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
                            onPress={() => this.props.removeEntry(rowData.row)} 
                        />
                    </View>
                    <View style={dayColStyle}>
                        <DaySelection
                        options={days}
                        data={rowData}
                        />
                    </View>
                    {this.renderTimeRange(rowData.timeRangeEntries[0], rowData.row, 0)}
                    {this.renderAddButtonOrTimeRange(rowData.timeRangeEntries, rowData.row)}
                </View>
        );
    }

    renderAddButtonOrTimeRange(timeRangeEntries, row) {
        if (timeRangeEntries.length === 1) {
            return (
                 <View style={styles.timeColStyle}>
                    <ButtonWithIcon 
                                iconName='ios-add-circle' 
                                onPress={() => this.props.addNewTimeRange(row)} 
                    />
                </View>
            );
        }
        return (
            this.renderTimeRange(timeRangeEntries[1], row, 1)
        );
    }

    render() {
        return (
            
            <View style={styles.openingHoursStyle}>
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
    openingHoursStyle: {
        height: 180,
    },
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
    const { entries } = openingHoursReducer;
    return { dataSource: dataSource.cloneWithRows(entries) };
};

export default connect(mapStateToProps, 
{showDaysSelectionModal, setDays, setFromTime, setToTime, showFromTimeModal, showToTimeModal, addNewEntry, removeEntry, addNewTimeRange })(OpeningHours);