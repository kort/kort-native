import React, { Component } from 'react';
import {
    View
} from 'react-native';

class MissionsOverview extends Component {

    state = { loggedIn: true };

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
    },
    
};

export default MissionsOverview;
