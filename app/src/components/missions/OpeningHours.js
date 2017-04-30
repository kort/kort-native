import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal
} from 'react-native';
import _ from 'lodash';
import SelectMultiple from 'react-native-select-multiple';
import OpeningHoursRepresentation from '../../date/OpeningHoursRepresentation';
import { TimeRangeSelection } from '../common';

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

    onSelectionsChange = (selectedDays) => {
        this.setState({ selectedDays });
    }

    showModal = () => this.setState({ modalVisible: true });
    hideModal = () => this.setState({ modalVisible: false });

  renderSelectedDays() {
      const daysToShow = _(this.state.selectedDays)
        .map('value')
        .value();

        let daysDisplay = '';
        if (_.isEmpty(daysToShow)) {
            daysDisplay = 'Days';
        } else {
            daysDisplay = OpeningHoursRepresentation(daysToShow);
        }
        return (
            <Text>{daysDisplay}</Text>
        );
  }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.showModal}>
                    {this.renderSelectedDays()}
                </TouchableOpacity>
                <Modal
                    visible={this.state.modalVisible}
                    transparent
                    animationType='fade'
                    onRequestClose={() => {}}
                >
                                <TouchableWithoutFeedback onPress={() => this.hideModal()} >
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
