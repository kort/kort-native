import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import AnswerSelection from './AnswerSelection';
import { Input, 
        Button,
        KortCoin } from '../common';

class MissionSolver extends Component {

    state = {
        freeTextAvailable: false,
        optionsAvailable: true
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
                />
            );
        }
        return <View />;
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
                        <Button>Complete Mission</Button>
                        <Button>Unable to solve</Button>
                    </View>
               </View>
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
    const { selectionAvailable, freetextAvailable } = answerReducer;
    return { selectionAvailable, freetextAvailable };
};


export default connect(mapStateToProps, {})(MissionSolver);
