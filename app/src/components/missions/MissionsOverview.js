import React, { Component } from 'react';
import {
    View
} from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import Config from '../../constants/Config';

class MissionsOverview extends Component {

    componentDidMount() {
        Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
    }

    render() {
        return (
            <View style={styles.bgColor}>
                <MapView style={styles.mapStyle} />
            </View>
        );
    }
}

const styles = {
    bgColor: {
        backgroundColor: '#202931',
        flex: 1
    },
    mapStyle: {
        backgroundColor: '#202931',
        flex: 1
    },
    
};

export default MissionsOverview;
