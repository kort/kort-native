import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { setFromTime, 
    setToTime, showFromTimeModal, showToTimeModal } from '../../../actions/OpeningHoursActions';

 class TimeRangeSelection extends Component {

    get2DigitMinutes = (date) => {
        return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    };

    get2DigitHours = (date) => {
        return (date.getHours() < 10 ? '0' : '') + date.getHours();
    };

    handleDatePickedFrom = (date) => {
        this.props.setFromTime(`${this.get2DigitHours(date)}:${this.get2DigitMinutes(date)}`,
            this.props.row, this.props.col);  
    };

    handleDatePickedTo = (date) => {
        this.props.setToTime(`${this.get2DigitHours(date)}:${this.get2DigitMinutes(date)}`,
            this.props.row, this.props.col);  
    };

    showFromModal = () => this.props.showFromTimeModal(true, this.props.row, this.props.col);
    showToModal = () => this.props.showToTimeModal(true, this.props.row, this.props.col);
    hideFromModal = () => this.props.showFromTimeModal(false, this.props.row, this.props.col);
    hideToModal = () => this.props.showToTimeModal(false, this.props.row, this.props.col);

    getDateFromString(timeString) {
        const time = timeString.split(':');
        if (time.length > 1) {
            console.log('create new date from ', time, ((time[0] * 3600) + (time[1] * 60)) * 1000);
            return new Date(((time[0] * 3600) + (time[1] * 60)) * 1000);
        }
        console.log('new date');
        return new Date();
    }

    render() {
        console.log('time range data', this.props.data);
        const { containerStyle } = styles;
        return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={this.showFromModal.bind(this)}>
                <Text>{this.props.data.fromTime}</Text>
                <DateTimePicker
                    isVisible={this.props.data.fromTimeModalVisible}
                    onConfirm={this.handleDatePickedFrom.bind(this)}
                    onCancel={this.hideFromModal.bind(this)}
                    mode='time'
                    titleIOS='From'
                />
                </TouchableOpacity>
                <Text>-</Text>
                <TouchableOpacity onPress={this.showToModal.bind(this)}>
                <DateTimePicker
                    isVisible={this.props.data.toTimeModalVisible}
                    onConfirm={this.handleDatePickedTo.bind(this)}
                    onCancel={this.hideToModal.bind(this)}
                    mode='time'
                    titleIOS='To'
                />
                <Text>{this.props.data.toTime}</Text>
                </TouchableOpacity>
        </View>
    );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row'
    }
};

export default connect(null, 
{ setFromTime, setToTime, showFromTimeModal, showToTimeModal })(TimeRangeSelection);
