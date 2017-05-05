import React, { Component } from 'react';
import {
    View,
    Text,
    ListView
} from 'react-native';
import { connect } from 'react-redux';
import TimeRangeSelection from './TimeRangeSelection';
import ModalDropdown from 'react-native-modal-dropdown';
import DaySelection from './DaySelection';
import { ButtonWithIcon } from '../../common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showDaysSelectionModal, setDays, setFromTime, 
    setToTime, showFromTimeModal, showToTimeModal, addNewEntry, removeEntry, addNewTimeRange, setOpenEnd } from '../../../actions/OpeningHoursActions';

class OpeningHours extends Component {

    onSelectOption(idx, value, row) {
        if (idx === '1') {
            this.props.setOpenEnd(row);
        } else {
            this.props.addNewTimeRange(row);
        }
    }

    adjustDropdownFrame(style) {
        const newStyle = style;
        newStyle.height = 60;
        return style;
    }

    renderDropdownRow(rowData) {
        return (
            <Text style={styles.rowTextStyle}>
                {rowData}
            </Text>
        );
    }

    renderTimeRange(timeRangeData, row, col) {
        return (
            <View style={styles.timeColStyle} key={`r${row}c${col}`}>
                    <TimeRangeSelection
                        data={timeRangeData}
                        row={row}
                        col={col}
                    />
                </View>
        );
    }

    renderTimeRangeEntries(rowData) {
        if (rowData.days.length !== 0 && rowData.days[0].value !== 11) {
                return [this.renderTimeRange(rowData.timeRangeEntries[0], rowData.row, 0), 
                    this.renderAddButtonOrTimeRange(rowData.timeRangeEntries, rowData.row)];
        }
        return null;
    }

    renderRow(rowData) {
        console.log('row', rowData);
        const { rowStyle, dayColStyle, deleteColStyle } = styles;
        return (
            <View style={rowStyle}>
                    <View style={deleteColStyle}>
                        <ButtonWithIcon 
                            iconName='ios-remove-circle' 
                            onPress={() => this.props.removeEntry(rowData.row)} 
                            size={30}
                        />
                    </View>
                    <View style={dayColStyle}>
                        <DaySelection
                        data={rowData}
                        />
                    </View>
                    {this.renderTimeRangeEntries(rowData)}
                </View>
        );
    }

    renderAddButtonOrTimeRange(timeRangeEntries, row) {
        if (timeRangeEntries.length === 1) {
            if (timeRangeEntries[0].openEnd) {
                return null;
            }
            return (
                 <View style={styles.timeColStyle} key={`v${row}`}>
                    <ModalDropdown 
                        options={['New Time Entry', 'Open End']}
                        animated={false}
                        showsVerticalScrollIndicator={false}
                        adjustFrame={style => this.adjustDropdownFrame(style)}
                        renderRow={this.renderDropdownRow.bind(this)}
                        onSelect={(idx, value) => this.onSelectOption(idx, value, row)}
                    >
                        <Ionicons 
                            style={{ color: '#FFFFFF', alignSelf: 'center' }}
                            size={30} 
                            name={'ios-add-circle'} 
                        />
                    </ModalDropdown>
                </View>
            );
        }
        return (this.renderTimeRange(timeRangeEntries[1], row, 1));
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
                                size={30}
                />
            </View>
        );
    }
}

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const styles = {
    rowTextStyle: {
        paddingTop: 5,
        color: '#395971',
        height: 30,
        fontWeight: 'bold'
    },
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
        width: 120,
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
{showDaysSelectionModal, setDays, setFromTime, setToTime, showFromTimeModal, showToTimeModal, addNewEntry, removeEntry, addNewTimeRange, setOpenEnd })(OpeningHours);