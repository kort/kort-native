import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal
} from 'react-native';
import _ from 'lodash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SelectMultiple from 'react-native-select-multiple';
import abbrevDays from 'abbrev-weekday-range';
import OpeningHoursRepresentation from '../../date/OpeningHoursRepresentation';
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

    state = {
        isDateTimePickerVisible: false,
        modalVisible: false,
        fromTime: 'From',
        toTime: 'To',
        day: 'Days'
    };
 
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePickedFrom = (date) => {
        this.setState({ fromTime: `${date.getHours()} : ${date.getMinutes()}` });
        this._hideDateTimePicker();
    };

    _handleDatePickedTo = (date) => {
        console.log(date, this.state.toTime);
        this.setState({ toTime: `${date.getHours()} : ${date.getMinutes()}` });
        this._hideDateTimePicker();
    };

    _showModal = () => this.setState({ modalVisible: true });

    _hideModal = () => this.setState({ modalVisible: false });


    onSelectionsChange = (selectedDays) => {
    // selectedFruits is array of { label, value } 
    this.setState({ selectedDays });
  }

  renderSelectedDays() {
      let daysToShow = _(this.state.selectedDays)
        .map('value')
        .value();
              console.log(this.state.selectedDays, daysToShow);

        let daysDisplay = '';
        if (_.isEmpty(daysToShow)) {
            daysDisplay = 'Days';
        } else {
            daysDisplay = OpeningHoursRepresentation(daysToShow);
        }
        return (
            <Text>{daysDisplay}</Text>
        );
  };

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity onPress={this._showModal}>
                    {this.renderSelectedDays()}
                </TouchableOpacity>
                <Modal
                    visible={this.state.modalVisible}
                    transparent
                    animationType='fade'
                    onRequestClose={() => {}}
                >
                                <TouchableWithoutFeedback onPress={() => this._hideModal()} >
                <View style={styles.containerStyle}>
                    <View style={styles.optionsStyle}>
                    <SelectMultiple
                        items={days}
                        selectedItems={this.state.selectedDays}
                        onSelectionsChange={this.onSelectionsChange}
                    />
                    </View>
                </View>
                                </TouchableWithoutFeedback>

            </Modal>              
                <TouchableOpacity onPress={this._showDateTimePicker}>
                <Text>{this.state.fromTime}</Text>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePickedFrom}
                    onCancel={this._hideDateTimePicker}
                    mode='time'
                    titleIOS='From'
                />
                </TouchableOpacity>
                <Text> - </Text>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePickedTo}
                    onCancel={this._hideDateTimePicker}
                    mode='time'
                    titleIOS='To'
                />
                <Text>{this.state.toTime}</Text>
                </TouchableOpacity>
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
    },
     containerStyle: {
         backgroundColor: 'rgba(0, 0, 0, 0.6)',
         position: 'relative',
                 alignItems: 'center',
        flex: 1,

         justifyContent: 'center'
     },
     optionsStyle: {
         height: 400
     },
};

export default (OpeningHours);
