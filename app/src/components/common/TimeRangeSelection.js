import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

/**
 * props: onPress, onConfirmFrom, onConfirmTo, onCancel, fromText, toText
 * 
 */
 class TimeRangeSelection extends Component {

    state = {
        isFromDateTimePickerVisible: false,
        isToDateTimePickerVisible: false,
        fromTime: 'From',
        toTime: 'To',
    };

    handleDatePickedFrom = (date) => {
        this.setState({ fromTime: `${date.getHours()} : ${date.getMinutes()}` });
        this.setState({ isFromDateTimePickerVisible: false });    
    };

    handleDatePickedTo = (date) => {
        console.log(date, this.state.toTime);
        this.setState({ toTime: `${date.getHours()} : ${date.getMinutes()}` });
        this.setState({ isToDateTimePickerVisible: false });   
    };

    showFromModal() {
        this.setState({ isFromDateTimePickerVisible: true });    
    }

    showToModal() {
        this.setState({ isToDateTimePickerVisible: true });    
    }

    hideFromModal() {
        this.setState({ isFromDateTimePickerVisible: false });    
    }

    hideToModal() {
        this.setState({ isToDateTimePickerVisible: false });    
    }

    render() {
        const { containerStyle } = styles;
        return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={this.showFromModal.bind(this)} style={styles.redStyle}>
                <Text>{this.state.fromTime}</Text>
                <DateTimePicker
                    isVisible={this.state.isFromDateTimePickerVisible}
                    onConfirm={this.handleDatePickedFrom.bind(this)}
                    onCancel={this.hideFromModal.bind(this)}
                    mode='time'
                    titleIOS='From'
                />
                </TouchableOpacity>
                <Text> - </Text>
                <TouchableOpacity onPress={this.showToModal.bind(this)}>
                <DateTimePicker
                    isVisible={this.state.isToDateTimePickerVisible}
                    onConfirm={this.handleDatePickedTo.bind(this)}
                    onCancel={this.hideToModal.bind(this)}
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
    redStyle: {
        backgroundColor: 'red'
    },
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 10
    }
};

export { TimeRangeSelection };
