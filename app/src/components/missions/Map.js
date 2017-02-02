import React, { Component } from 'react';
import {
    View
} from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import { connect } from 'react-redux';
import Config from '../../constants/Config';
import { showMapModeFullscreen } from '../../actions/MapActions';

class Map extends Component {

    state = { now: 0 };

    componentDidMount() {
        Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
    }

    onTap() {
        const d = new Date();
        if (Math.abs(d.getSeconds() - this.state.now) <= 1) {
            console.log('zoom');
        } else {
            console.log('fullscreen toggle');
            this.props.showMapModeFullscreen(!this.props.mapModeFullScreen);
        }

        this.setState({ now: d.getSeconds() });
    }

    onLongPress() {

    }

    onOpenAnnotation() {

    }

    render() {
        return (
            <View style={styles.bgColor}>
                <MapView 
                    style={styles.mapStyle}
                    logoIsHidden
                    showsUserLocation
                    onTap={this.onTap.bind(this)}
                    onLongPress={this.onLongPress.bind(this)}
                    onOpenAnnotation={this.onOpenAnnotation.bind(this)}
                />
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

const mapStateToProps = ({ mapReducer }) => {
    const { mapModeFullScreen } = mapReducer;
    return { mapModeFullScreen };
};


export default connect(mapStateToProps, { showMapModeFullscreen })(Map);
