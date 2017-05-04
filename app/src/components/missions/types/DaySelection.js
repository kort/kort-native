import React, { Component } from 'react';
import { 
    View,
    Modal,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity
 } from 'react-native';
 import { connect } from 'react-redux';
import SelectMultiple from 'react-native-select-multiple';
import { showDaysSelectionModal, setDays } from '../../../actions/OpeningHoursActions';
import { answerModalVisible } from '../../../actions/AnswerSelectionActions';

const days = [
    { value: 0, label: 'Monday' },
    { value: 1, label: 'Tuesday' },
    { value: 2, label: 'Wednesday' },
    { value: 3, label: 'Thursday' },
    { value: 4, label: 'Friday' },
    { value: 5, label: 'Saturday' },
    { value: 6, label: 'Sunday' }
];

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
    }

    render() {
        return (
            <View>
                <TouchableOpacity 
                    onPress={this.showModal}
                >
                    <Text style={styles.textStyle}>{this.props.data.formattedDays ? this.props.data.formattedDays : 'Days'}</Text>
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
                        items={days}
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


export default connect(null, {showDaysSelectionModal, setDays, answerModalVisible })(DaySelection);
