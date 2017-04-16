import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';

class About extends Component {

    render() {
        return (
            <View style={styles.bgColor} >
            </View>
        );
    }
}

const styles = {
    bgColor: {
        marginTop: (Platform.OS === 'ios') ? 64 : 54,
        backgroundColor: '#202931',
        flex: 1
    },
};


export default (About);