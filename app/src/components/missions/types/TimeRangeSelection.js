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

    handleDatePickedFrom = (date) => {
        this.props.setFromTime(`${date.getHours()}:${date.getMinutes()}`);
    };

    handleDatePickedTo = (date) => {
        this.props.setToTime(`${date.getHours()}:${date.getMinutes()}`);  
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
