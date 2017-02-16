import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { answerSet } from '../../actions/AnswerSelectionActions';
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
        if (this.state.modalType === 'unsolvable') {
            console.log('hide mission');
        }
    }

    onModalDecline() {
        this.setState({ showModal: false });  
    }

    solveMission() {
        if (this.props.answer !== '') {
            this.setState({ 
                showModal: true,
                modalConfirm: false,
                modalText: 'Congratulations! You have earned 100 additional Koins. Once your answer is validated you will get another 100 Koins.',
                modalType: 'win'
            });
        } else {
            this.setState({ 
                showModal: true,
                modalConfirm: false,
                modalText: 'Please enter a valid answer!',
                modalType: 'validation'
            });
        }
    }

    confirmUnsolvable() {
        this.setState({ 
            showModal: true,
            modalConfirm: true,
            modalText: 'Do you really want to set this mission as unsolvable? It will be hidden from now on.',
            modalType: 'unsolvable' 
        });
    }

    renderAnswerSelection() {
        if (this.props.selectionAvailable) {
            return <AnswerSelection />;
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
            return <KortCoin animated>100</KortCoin>;
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
                     <KortCoin>100</KortCoin>
                    <Text style={missionTextStyle}>What type of cuisine is offered at this place?</Text>
                </View>
                <View style={containerStyle} >
                    {this.renderAnswerSelection()}
                    {this.renderAnswerFreetext()}
                    <View>
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
        height: 300,
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    bgColor: {
        backgroundColor: '#395971',
        alignItems: 'center',
        height: 400,
    },
    completeMissionButtonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#657C8E',
        marginTop: 30,
        marginLeft: 5,
        marginRight: 5,
        height: 80,
        width: 300,
        justifyContent: 'center'
    },
    unsolvableButtonStyle: {
        alignSelf: 'center',
        marginTop: 30,
        width: 150, 
    }
};

const mapStateToProps = ({ answerReducer }) => {
    console.log('answer', answerReducer);
    const { selectionAvailable, freetextAvailable, answer } = answerReducer;
    return { selectionAvailable, freetextAvailable, answer };
};


export default connect(mapStateToProps, { answerSet })(MissionSolver);
