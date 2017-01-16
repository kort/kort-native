import React, { Component } from 'react';
import {
    View
} from 'react-native';
import LoginOverview from '../login/LoginOverview';



class MissionsOverview extends Component {

    state = { loggedIn: true };

    renderRootView() {
    if (this.state.loggedIn) {
        return <View style={styles.bgColor} />;
    }
    return <LoginOverview />;
    }

    render() {
        return (
            <View style={styles.transparentColor}>
            {this.renderRootView()}
            </View>
        );
    }
}

const styles = {
    bgColor: {
        backgroundColor: '#202931',
        flex: 1
    },
    transparentColor: {
        backgroundColor: 'transparent',
        flex: 1
    }
};

export default MissionsOverview;
