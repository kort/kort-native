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
        this.props.setFromTime(`${this.get2DigitHours(date)}:${this.get2DigitMinutes(date)}`);
    };

    handleDatePickedTo = (date) => {
        this.props.setToTime(`${this.get2DigitHours(date)}:${this.get2DigitMinutes(date)}`);  
    };

    showFromModal = () => this.props.showFromTimeModal(true);
    showToModal = () => this.props.showToTimeModal(true);
    hideFromModal = () => this.props.showFromTimeModal(false);
    hideToModal = () => this.props.showToTimeModal(false);

    render() {
        const { containerStyle } = styles;
        return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={this.showFromModal.bind(this)}>
                <Text>{this.props.fromTime}</Text>
                <DateTimePicker
                    isVisible={this.props.fromTimeModalVisible}
                    onConfirm={this.handleDatePickedFrom.bind(this)}
                    onCancel={this.hideFromModal.bind(this)}
                    mode='time'
                    titleIOS='From'
                />
                </TouchableOpacity>
                <Text>-</Text>
                <TouchableOpacity onPress={this.showToModal.bind(this)}>
                <DateTimePicker
                    isVisible={this.props.toTimeModalVisible}
                    onConfirm={this.handleDatePickedTo.bind(this)}
                    onCancel={this.hideToModal.bind(this)}
                    mode='time'
                    titleIOS='To'
                />
                <Text>{this.props.toTime}</Text>
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

const mapStateToProps = ({ openingHoursReducer }) => {
    const { fromTimeModalVisible, toTimeModalVisible, fromTime, toTime } = openingHoursReducer;
    return { fromTimeModalVisible, toTimeModalVisible, fromTime, toTime };
};

export default connect(mapStateToProps, 
{ setFromTime, setToTime, showFromTimeModal, showToTimeModal })(TimeRangeSelection);
