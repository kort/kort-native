import React, { Component } from 'react';
import { 
    View,
    Modal,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity
 } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import { connect } from 'react-redux';
import { showDaysSelectionModal, setDays } from '../../../actions/OpeningHoursActions';

 class DaySelection extends Component {

    onSelectionsChange = (selectedDays) => this.props.setDays(selectedDays);
    showModal = () => this.props.showDaysSelectionModal(true);
    hideModal = () => this.props.showDaysSelectionModal(false);

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.showModal.bind(this)}>
                    <Text>{this.props.formattedDays}</Text>
                </TouchableOpacity>
                <Modal
                    visible={this.props.daysSelectionModalVisible}
                    transparent
                    animationType='fade'
                    onRequestClose={() => {}}
                >
                <TouchableWithoutFeedback onPress={() => this.hideModal()} >
                <View style={styles.containerStyle}>
                    <View style={styles.optionsStyle}>
                    <SelectMultiple
                        items={this.props.options}
                        selectedItems={this.props.days}
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
 };

const mapStateToProps = ({ openingHoursReducer }) => {
    const { daysSelectionModalVisible, days, formattedDays } = openingHoursReducer;
    return { daysSelectionModalVisible, days, formattedDays };
};

export default connect(mapStateToProps, { showDaysSelectionModal, setDays })(DaySelection);
