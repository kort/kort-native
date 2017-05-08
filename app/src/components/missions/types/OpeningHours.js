import React, { Component } from 'react';
import {
    View,
    Text,
    ListView
} from 'react-native';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimeRangeSelection from './TimeRangeSelection';
import DaySelection from './DaySelection';
import OpeningHoursRepresentation from '../../../date/OpeningHoursRepresentation';
import { ButtonWithIcon, Button, ModalMultiInput } from '../../common';
import { showDaysSelectionModal, setDays, setFromTime, 
    setToTime, showFromTimeModal, showToTimeModal, addNewEntry, 
    removeEntry, addNewTimeRange, setOpenEnd, 
    setManuallyEdited } from '../../../actions/OpeningHoursActions';

class OpeningHours extends Component {

    state={ showEditModal: false };

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

    editOpeningHoursText() {
        if (!this.props.manuallyEdited) {
            this.props.setAnswer(OpeningHoursRepresentation(this.props.entries));
        }
        this.setState({ showEditModal: true });
    }

    manuallyEdited(text) {
        this.props.setManuallyEdited(true);
        this.props.setAnswer(text);
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

    renderEditButton() {
        if (this.props.entries.length > 0) {
            return (
                <Button 
                        style={styles.buttonStyle}
                        onPress={this.editOpeningHoursText.bind(this)}
                >Edit Result
                </Button>
            );
        }
        return null;
    }

    renderResetButton() {
        if (this.props.manuallyEdited) {
            return (
                <Button 
                        style={styles.buttonStyle}
                        onPress={() => this.props.setManuallyEdited(false)}
                >Reset
                </Button>
            );
        }
        return null;
    }

    render() {
        return (
            <View style={styles.openingHoursStyle}>
                <ListView 
                    dataSource={this.props.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                    enableEmptySections
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.deleteColStyle}>
                    <ButtonWithIcon 
                                iconName='ios-add-circle' 
                                onPress={() => this.props.addNewEntry()} 
                                size={30}
                    />
                    </View>
                    <View style={styles.dayColStyle}>
                        {this.renderEditButton()}
                    </View>
                    <View style={styles.dayColStyle}>
                        {this.renderResetButton()}
                    </View>
                    <ModalMultiInput 
                        visible={this.state.showEditModal}
                        onPress={() => this.setState({ showEditModal: false })}
                        value={this.props.answer}
                        onChangeText={this.manuallyEdited.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const styles = {
    buttonStyle: {
        alignSelf: 'center',
        width: 100, 
    },
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
        paddingBottom: 1,
        paddingTop: 1,
        height: 34
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
    const { entries, manuallyEdited } = openingHoursReducer;
    return { dataSource: dataSource.cloneWithRows(entries), entries, manuallyEdited };
};

export default connect(mapStateToProps, 
{ showDaysSelectionModal, 
    setDays, 
    setFromTime, 
    setToTime, 
    showFromTimeModal, 
    showToTimeModal, 
    addNewEntry, 
    removeEntry, 
    addNewTimeRange, 
    setOpenEnd, 
    setManuallyEdited })(OpeningHours);
