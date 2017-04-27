import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SelectMultiple from 'react-native-select-multiple'

const days = ['Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday','Sunday'];


class OpeningHours extends Component {

    state = {
        isDateTimePickerVisible: false,
        modalVisible: false
    };
 
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };

    _showModal = () => this.setState({ modalVisible: true });

    _hideModal = () => this.setState({ modalVisible: false });


    onSelectionsChange = (selectedDays) => {
    // selectedFruits is array of { label, value } 
    this.setState({ selectedDays });
  }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity onPress={this._showModal}>
                <Text>Days</Text>
                </TouchableOpacity>
                <Modal
                    visible={this.state.modalVisible}
                    transparent
                    animationType='fade'
                    onRequestClose={() => {}}
                >
                <View style={styles.containerStyle}>
                    <View style={styles.optionsStyle}>
                    <SelectMultiple
                        items={days}
                        selectedItems={this.state.selectedDays}
                        onSelectionsChange={this.onSelectionsChange}
                    />
                    <TouchableOpacity onPress={this._hideModal}>
                        <Text>OK</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>              
                <TouchableOpacity onPress={this._showDateTimePicker}>
                <Text>From</Text>
                </TouchableOpacity>
                <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                mode='time'
                titleIOS='From'
                />
                <TouchableOpacity onPress={this._showDateTimePicker}>
                <Text>To</Text>
                </TouchableOpacity>
                <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                mode='time'
                titleIOS='To'
                />
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
         height: 300
     }
};

export default (OpeningHours);
