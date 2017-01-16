import React, { Component } from 'react';
import {
    View
} from 'react-native';

class HighscoreOverview extends Component {
    render() {
        return (
            <View style={styles.bgColor} />
        );
    }
}

const styles = {
    bgColor: {
        backgroundColor: '#202931',
        flex: 1
    }
};

export default HighscoreOverview;
