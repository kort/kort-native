import React, { Component } from 'react';
import {
    View
} from 'react-native';
import Map from './Map';

class MissionsOverview extends Component {

    render() {
        return (
            <View style={styles.bgColor}>
                <Map />
            </View>
        );
    }
}

const styles = {
    bgColor: {
        backgroundColor: '#202931',
        flex: 1
    }
};


export default MissionsOverview;
