import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    Picker
} from 'react-native';
import { Input } from '../common';

class MissionSolver extends Component {

    state = { language: '' }
   
    render() {
        return (
            <View style={styles.bgColor}>
                <Text style={{ color: 'white' }}>Mission Solver</Text>

               
            </View>
        );
    }
}

const styles = {
    bgColor: {
        backgroundColor: '#395971',
        alignItems: 'center',
        height: 400
    }
};

export default MissionSolver;
