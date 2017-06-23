import React, { Component } from 'react';
import { 
    View,
    Modal,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity
 } from 'react-native';
 import { connect } from 'react-redux';
 import I18n from 'react-native-i18n';
import SelectMultiple from 'react-native-select-multiple';
import { showDaysSelectionModal, setDays } from '../../../actions/OpeningHoursActions';
import { answerModalVisible } from '../../../actions/AnswerSelectionActions';

 class DaySelection extends Component {

    onSelectionsChange = (selectedDays) => {
        this.props.setDays(selectedDays, this.props.data.row);
    }

    showModal = () => {
        this.props.showDaysSelectionModal(true, this.props.data.row);
        this.props.answerModalVisible(true);
    }
    hideModal = () => {
        this.props.showDaysSelectionModal(false, this.props.data.row);
        this.props.answerModalVisible(false);
        this.props.dataChanged();
    }

    days = [
        { value: 0, label: I18n.t('mission_answer_opening_hours_monday') },
        { value: 1, label: I18n.t('mission_answer_opening_hours_tuesday') },
        { value: 2, label: I18n.t('mission_answer_opening_hours_wednesday') },
        { value: 3, label: I18n.t('mission_answer_opening_hours_thursday') },
        { value: 4, label: I18n.t('mission_answer_opening_hours_friday') },
        { value: 5, label: I18n.t('mission_answer_opening_hours_saturday') },
        { value: 6, label: I18n.t('mission_answer_opening_hours_sunday') },
        { value: 10, label: I18n.t('mission_answer_opening_hours_public_holidays') },
        { value: 11, label: I18n.t('mission_answer_opening_hours_24_7') }
    ];

    render() {
        return (
            <View>
                <TouchableOpacity 
                    onPress={this.showModal}
                >
                    <Text style={styles.textStyle}>
                        {this.props.data.formattedDays ? this.props.data.formattedDays : 
                        I18n.t('mission_answer_opening_hours_placeholder_days')}
                    </Text>
                </TouchableOpacity>
                <Modal
                    visible={this.props.data.daysSelectionModalVisible}
                    transparent
                    animationType='none'
                    onRequestClose={() => {}}
                >
                <TouchableWithoutFeedback onPress={this.hideModal} >
                <View style={styles.containerStyle}>
                    <View style={styles.optionsStyle}>
                    <SelectMultiple
                        items={this.days}
                        selectedItems={this.props.data.days}
                        onSelectionsChange={this.onSelectionsChange}
                    />
                    </View>
                </View>
                </TouchableWithoutFeedback>

            </Modal>
            </View>
        );
    }
}

 const styles = {
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
     textStyle: {
         color: 'white',
         fontSize: 16
     }
 };


export default connect(null, { showDaysSelectionModal, setDays, answerModalVisible })(DaySelection);
