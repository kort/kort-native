import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import TimeRangeSelection from './TimeRangeSelection';
import DaySelection from './DaySelection';
import OpeningHoursRepresentation from '../../../date/OpeningHoursRepresentation';
import { ButtonWithIcon, Button, ModalMultiInput } from '../../common';
import { showDaysSelectionModal, setDays, setFromTime, 
    setToTime, showFromTimeModal, showToTimeModal, addNewEntry, 
    removeEntry, addNewTimeRange, setOpenEnd, 
    setManuallyEdited,
    setInitialState } from '../../../actions/OpeningHoursActions';

class OpeningHours extends Component {

    state={ showEditModal: false };

    componentDidMount() {
        this.props.setInitialState();
    }

    onSelectOption(idx, value, row) {
        if (idx === '1') {
            this.props.setOpenEnd(row);
            setTimeout(() => {
                this.dataChanged();
            }, 500);          
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

    dataChanged() {
        this.props.setAnswer(OpeningHoursRepresentation(this.props.entries));
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
                        dataChanged={this.dataChanged.bind(this)}
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
                        dataChanged={this.dataChanged.bind(this)}
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
                        options={[I18n.t('mission_answer_opening_hours_add_time_entry'), 
                            I18n.t('mission_answer_opening_hours_open_end')]}
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
                >{I18n.t('mission_answer_opening_hours_edit_result')}
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
                >{I18n.t('mission_answer_opening_hours_edit_reset')}
                </Button>
            );
        }
        return null;
    }

    render() {
        const isEmpty = _.isEmpty(this.props.entries);
        return (
            <View style={isEmpty ? styles.openingHoursStyleEmpty : styles.openingHoursStyle}>
                <ListView 
                    dataSource={this.props.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                    enableEmptySections
                />
                <View style={isEmpty ? styles.noRowStyle : styles.simpleRowStyle}>
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

const deviceWidth = Dimensions.get('window').width;

const styles = {
    noRowStyle: {
        alignItems: 'center'
    },
    simpleRowStyle: {
        flexDirection: 'row'
    },
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
    openingHoursStyleEmpty: {
        height: 50,
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
        width: (deviceWidth <= 320) ? 80 : 120,
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
    setManuallyEdited,
    setInitialState })(OpeningHours);
