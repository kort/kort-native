import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { answerSet, answerModalVisible } from '../../actions/AnswerSelectionActions';
import AnswerSelection from './AnswerSelection';
import { Input, 
        Button,
        KortCoin,
        Popup } from '../common';

class MissionSolver extends Component {

    state = {
        showModal: false,
        modalConfirm: false,
        modalText: '',
        modalType: ''
    }

    onModalConfirm() {
        this.setState({ showModal: false });
        this.props.answerModalVisible(false);
        if (this.state.modalType === 'unsolvable') {
            console.log('hide mission');
        }
    }

    onModalDecline() {
        this.setState({ showModal: false });  
        this.props.answerModalVisible(false);
    }

    solveMission() {
        if (this.props.answer !== '') {
            this.props.answerModalVisible(true);
            this.setState({ 
                showModal: true,
                modalConfirm: false,
                modalText: `Congratulations! You have earned ${this.props.activeMission.koinReward} additional Koins. Once your answer is validated you will get another ${this.props.activeMission.koinReward} Koins.`,
                modalType: 'win'
            });
        } else {
            this.props.answerModalVisible(true);
            this.setState({ 
                showModal: true,
                modalConfirm: false,
                modalText: 'Please enter a valid answer!',
                modalType: 'validation'
            });
        }
    }

    confirmUnsolvable() {
        this.props.answerModalVisible(true);
        this.setState({ 
            showModal: true,
            modalConfirm: true,
            modalText: 'Do you really want to set this mission as unsolvable? It will be hidden from now on.',
            modalType: 'unsolvable' 
        });
    }

    renderAnswerSelection() {
        if (this.props.selectionAvailable) {
            return <AnswerSelection options={this.props.activeMission.type.options} />;
        }
        return <View />;
    }
    renderAnswerFreetext() {
        if (this.props.freetextAvailable) {
            return (
                <Input
                    placeHolder='Type in your answer'
                    keyboardType='default'
                    value={this.props.answer}
                    onChangeText={value => this.props.answerSet(value)}
                />
            );
        }
        return <View />;
    }

    renderModalHeader() {
        if (this.state.modalType === 'win') {
            return <KortCoin animated>{this.props.activeMission.koinReward}</KortCoin>;
        }
    }

    renderModal() {
                return (
                <Popup 
                    onAccept={this.onModalConfirm.bind(this)}
                    visible={this.state.showModal}
                    confirm={this.state.modalConfirm}
                    onDecline={this.onModalDecline.bind(this)}
                    message={this.state.modalText}
                >
                     {this.renderModalHeader()}
                </Popup>                    
            );
    }

    render() {
        const { bgColor, missionTextStyle, headerStyle,
            containerStyle, unsolvableButtonStyle, completeMissionButtonStyle } = styles;
        return (
            <View style={bgColor}>
                <View style={headerStyle}>
                     <KortCoin>{this.props.activeMission.koinReward}</KortCoin>
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
    console.log('mission', missionReducer);
    const { selectionAvailable, freetextAvailable, answer } = answerReducer;
    const { activeMission } = missionReducer;
    return { selectionAvailable, freetextAvailable, answer, activeMission };
};


export default connect(mapStateToProps, { answerSet, answerModalVisible })(MissionSolver);
