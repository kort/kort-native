import React, { Component } from 'react';
import {
    View
} from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import { connect } from 'react-redux';
import Config from '../../constants/Config';
import { showMapModeFullscreen } from '../../actions/MapActions';
import GeoLocation from '../../geolocation/GeoLocation';

class Map extends Component {

    state = { now: 0 };

    componentDidMount() {
        Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
        Mapbox.setMetricsEnabled(false);
    }

    componentWillReceiveProps(nextProps) {
        let lastLocation = '';
        if (this.props && this.props.currentLocation) {
            lastLocation = this.props.currentLocation;
        }

        if (nextProps.currentLocation && (lastLocation !== nextProps.currentLocation)) {
            console.log(nextProps.currentLocation.coords);
            const { latitude, longitude } = nextProps.currentLocation.coords;
            this.map.setCenterCoordinate(latitude, longitude, true, null);
        }
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

    map = null;

    render() {
        return (
            <View style={styles.bgColor}>
                <GeoLocation />
                <MapView
                    ref={map => { this.map = map; }}                    
                    style={styles.mapStyle}
                    logoIsHidden
                    showsUserLocation
                    initialZoomLevel={13}
                    initialCenterCoordinate={{
                        latitude: Config.MAPBOX_INITIAL_COORD_LATITUDE,
                        longitude: Config.MAPBOX_INITIAL_COORD_LONGITUDE
                    }}
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
    console.log(mapReducer);
    const { mapModeFullScreen, currentLocation } = mapReducer;
    return { mapModeFullScreen, currentLocation };
};


export default connect(mapStateToProps, { showMapModeFullscreen })(Map);
