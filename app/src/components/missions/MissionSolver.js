import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    Picker,
    Image
} from 'react-native';
import { Input, 
        Button,
        KortCoin } from '../common';
import AnswerSelection from './AnswerSelection';

class MissionSolver extends Component {

    state = { language: '' }
   
    render() {
        return (
            <View style={styles.bgColor}>
                <View style={styles.headerStyle}>
                     <KortCoin>100</KortCoin>
                    <Text style={styles.missionTextStyle}>What type of cuisine is offered at this place?</Text>
                </View>
                <View style={styles.containerStyle} >
                    <AnswerSelection id={123123} />
                    <View style={styles.buttonsStyle}>
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

export default MissionSolver;
