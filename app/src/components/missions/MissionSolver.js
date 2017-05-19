import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import I18n from 'react-native-i18n';
import { answerSet, 
         hideModal,
         showModal, 
         setFreetextAvailable } from '../../actions/AnswerSelectionActions';
import AnswerSelection from './AnswerSelection';
import { Input, 
        Button,
        KortCoin,
        Popup } from '../common';
import OpeningHours from './types/OpeningHours';

class MissionSolver extends Component {

    componentDidMount() {
        this.props.answerSet('');
        if (_.isEmpty(this.props.activeMission.options)) {
            this.props.setFreetextAvailable(this.props.activeMission.inputType.name);
        }
    }

    onModalConfirm() {
        this.props.hideModal(true);
        if (this.props.modalType === 'unsolvable') {
            console.log('hide mission'); //TODO
        }
    }

    onModalDecline() {
        this.props.hideModal(true);
    }

    solveMission() {
        const mission = this.props.activeMission;
        const validationMessage = this.validateInput() ? '' : 
            mission.inputType.constraints.description;
        if (this.props.answer !== '' && validationMessage === '') {
            console.log('win this');
            this.props.showModal(false, I18n.t('mission_message_reward', { koinReward: mission.koinReward }), 'win');
        } else {
            this.props.showModal(false, I18n.t('mission_message_valid_answer', { validationMessage }), 'validation');
        }
    }

    confirmUnsolvable() {
        this.props.showModal(true, I18n.t('mission_message_unsolvable'), 'unsolvable');
    }

    validateInput() {
        const { re, upperBound, lowerBound } = this.props.activeMission.inputType.constraints;
            if (re) {
                const regex = new RegExp(re);
                return regex.test(this.props.answer);
            } else if (upperBound && lowerBound) {
                return lowerBound <= parseFloat(this.props.answer) && 
                    parseFloat(this.props.answer) <= upperBound;
            }
        return true;
    }

    createListItem(index, item) {
        return { value: index, name: item };
    }

    determineKeyboardType() {
        switch (this.props.freetextType) {
            case 'text':
                return 'default';
            case 'number':
                return 'numeric';
            default:
                return '';
        }
    }

    renderAnswerSelection() {
        //TODO handle different types of mission in a nicer way
        if (this.props.activeMission.type === 'mission_opening_hours') {
            return (<OpeningHours 
                setAnswer={value => this.props.answerSet(value)}
                answer={this.props.answer}
            />);
        }

        if (!_.isEmpty(this.props.activeMission.inputType.options)) {
            const options = _.map(this.props.activeMission.inputType.options, 
                (item, index) => { return { value: index, name: item }; });
            if (this.props.activeMission.inputType.name !== 'select') {
                options.unshift({ value: -1, name: I18n.t('mission_answer_options_other') });
            }
            return <AnswerSelection options={options} />;
        }
        return null;
    }

    renderAnswerFreetext() {
        const keyboardType = this.determineKeyboardType();
        if (keyboardType !== '') {
            return (
                <Input
                    placeHolder={I18n.t('mission_answer_placeholder')}
                    keyboardType={keyboardType}
                    value={this.props.answer}
                    onChangeText={value => this.props.answerSet(value)}
                />
            );
        }   
        return null;
    }

    renderModalHeader() {
        if (this.props.modalType === 'win') {
            console.log('win');
            return <KortCoin animationStyle='win'>{this.props.activeMission.koinReward}</KortCoin>;
        }
    }

    renderModal() {
                return (
                <Popup 
                    onAccept={this.onModalConfirm.bind(this)}
                    visible={this.props.modalVisible}
                    confirm={this.props.modalConfirm}
                    onDecline={this.onModalDecline.bind(this)}
                    message={this.props.modalText}
                >
                     {this.renderModalHeader()}
                </Popup>                    
            );
    }

    render() {
        const { bgColor, missionTextStyle, headerStyle,
            containerStyle, unsolvableButtonStyle, completeMissionButtonStyle } = styles;
        return (
            <View style={[bgColor, { height: this.props.missionViewHeight }]}>
                <View style={headerStyle}>
                    <KortCoin animationStyle='normal'>
                         {this.props.activeMission.koinReward}
                    </KortCoin>
                    <Text style={missionTextStyle}>{this.props.activeMission.question}</Text>
                </View>
                <View style={containerStyle} >
                    {this.renderAnswerSelection()}
                    {this.renderAnswerFreetext()}
                        <Button
                            onPress={this.solveMission.bind(this)}
                            style={completeMissionButtonStyle}
                        >Complete Mission
                        </Button>
                        <Button
                            onPress={this.confirmUnsolvable.bind(this)}
                            style={unsolvableButtonStyle}
                        >
                            Unable to solve
                        </Button>
               </View>
               {this.renderModal()}
            </View>
        );
    }
}

const styles = {
    headerStyle: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        paddingRight: 30,
        paddingBottom: 20,
        backgroundColor: 'transparent'
        
    },
    missionTextStyle: {
        color: 'white',
        marginLeft: 10,
        marginRight: 40,
    },
    containerStyle: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    bgColor: {
        backgroundColor: '#395971',
        alignItems: 'center',
        height: 300,
    },
    completeMissionButtonStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#657C8E',
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        width: 300,
    },
    unsolvableButtonStyle: {
        alignSelf: 'center',
        width: 150, 
    }
};

const mapStateToProps = ({ answerReducer, missionReducer }) => {
    console.log(answerReducer);
    const { freetextType, answer, modalVisible, modalConfirm, modalText, modalType } = answerReducer;
    const { activeMission, missionViewHeight } = missionReducer;
    return { freetextType, answer, modalVisible, modalConfirm, modalText, modalType, activeMission, missionViewHeight };
};


export default connect(mapStateToProps, 
{ answerSet, hideModal, showModal, setFreetextAvailable })(MissionSolver);
