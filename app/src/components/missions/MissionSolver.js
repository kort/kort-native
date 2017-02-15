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
        modalText: ''
    }

    solveMission() {
        if (this.props.answer !== '') {
            this.setState({ 
                showModal: true,
                modalText: 'Congratulations! You have earned additional Koins.' 
            });
        } else {
            this.setState({ 
                showModal: true,
                modalText: 'Please enter a valid answer!' 
            });
        }
    }

    confirmUnsolvable() {
        this.setState({ 
            showModal: true,
            modalText: 'Do you really want to set this mission as unsolvable? It will be hidden from now on.' 
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

    renderModal() {
                return (
                <Popup 
                    onAccept={() => this.setState({ showModal: false })}
                    visible={this.state.showModal}
                >
                    {this.state.modalText}
                </Popup>
            );
    }

    render() {
        const { bgColor, missionTextStyle, headerStyle,
            containerStyle, buttonsStyle } = styles;
        return (
            <View style={bgColor}>
                <View style={headerStyle}>
                     <KortCoin>100</KortCoin>
                    <Text style={missionTextStyle}>What type of cuisine is offered at this place?</Text>
                </View>
                <View style={containerStyle} >
                    {this.renderAnswerSelection()}
                    {this.renderAnswerFreetext()}
                    <View style={buttonsStyle}>
                        <Button
                            onPress={this.solveMission.bind(this)}
                        >Complete Mission
                        </Button>
                        <Button
                            onPress={this.confirmUnsolvable.bind(this)}
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
    buttonsStyle: {
        paddingTop: 100,
        width: 250
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
    }
};

const mapStateToProps = ({ answerReducer }) => {
    console.log('answer', answerReducer);
    const { selectionAvailable, freetextAvailable, answer } = answerReducer;
    return { selectionAvailable, freetextAvailable, answer };
};


export default connect(mapStateToProps, { answerSet })(MissionSolver);
