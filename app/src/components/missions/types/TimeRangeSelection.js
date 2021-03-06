import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { setFromTime, 
    setToTime, showFromTimeModal, showToTimeModal } from '../../../actions/OpeningHoursActions';
import { answerModalVisible } from '../../../actions/AnswerSelectionActions';


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
        this.props.answerModalVisible(false);
        setTimeout(() => {
                this.props.dataChanged();
            }, 500);        
    };

    handleDatePickedTo = (date) => {
        this.props.setToTime(`${this.get2DigitHours(date)}:${this.get2DigitMinutes(date)}`,
            this.props.row, this.props.col);  
        this.props.answerModalVisible(false);
        setTimeout(() => {
                this.props.dataChanged();
            }, 500);  
    };

    showFromModal = () => {
        this.props.showFromTimeModal(true, this.props.row, this.props.col);
        this.props.answerModalVisible(true);
    }
    showToModal = () => {
        this.props.showToTimeModal(true, this.props.row, this.props.col);
        this.props.answerModalVisible(true);
    }
    hideFromModal = () => {
        this.props.showFromTimeModal(false, this.props.row, this.props.col);
        this.props.answerModalVisible(false);
    }
    hideToModal = () => {
        this.props.showToTimeModal(false, this.props.row, this.props.col);
        this.props.answerModalVisible(false);
    }

    renderOpenEnd() {
        if (this.props.data.openEnd) {
            return '+';
        }
    }

    render() {
        console.log('time range data', this.props.data);
        const { containerStyle, textStyle } = styles;
        return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={this.showFromModal.bind(this)}>
                <Text style={textStyle}>
                    {this.props.data.fromTime === '' ? 
                        I18n.t('mission_answer_opening_hours_placeholder_from') : 
                        this.props.data.fromTime}
                </Text>
                <DateTimePicker
                    isVisible={this.props.data.fromTimeModalVisible}
                    onConfirm={this.handleDatePickedFrom.bind(this)}
                    onCancel={this.hideFromModal.bind(this)}
                    mode='time'
                    titleIOS={I18n.t('mission_answer_opening_hours_placeholder_from')}
                />
                </TouchableOpacity>
                <Text style={textStyle}>-</Text>
                <TouchableOpacity onPress={this.showToModal.bind(this)}>
                <DateTimePicker
                    isVisible={this.props.data.toTimeModalVisible}
                    onConfirm={this.handleDatePickedTo.bind(this)}
                    onCancel={this.hideToModal.bind(this)}
                    mode='time'
                    titleIOS={I18n.t('mission_answer_opening_hours_placeholder_to')}
                />
                <Text style={textStyle}>
                    {this.props.data.toTime === '' ?
                        I18n.t('mission_answer_opening_hours_placeholder_to') : 
                        this.props.data.toTime}
                    {this.renderOpenEnd()}
                </Text>
                </TouchableOpacity>
        </View>
    );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row'
    },
    textStyle: {
         color: 'white',
         fontSize: 16
     }
};

export default connect(null, 
{ setFromTime, 
    setToTime, 
    showFromTimeModal, 
    showToTimeModal, 
    answerModalVisible })(TimeRangeSelection);
