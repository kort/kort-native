import React, { Component } from 'react';
import {
    View
} from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import { connect } from 'react-redux';
import Config from '../../constants/Config';
import { showMapModeFullscreen } from '../../actions/MapActions';
import GeoLocation from '../../geolocation/GeoLocation';
import { RoundButton } from '../common';

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
            this.centerMapAroundLocation(nextProps.currentLocation.coords);
        }
    }

    onTap(tapRegion) {
        if (tapRegion.screenCoordY > 50) {
            const d = new Date();
            if (Math.abs(d.getSeconds() - this.state.now) <= 1) {
                console.log('zoom');
            } else {
                console.log('fullscreen toggle');
                this.props.showMapModeFullscreen(!this.props.mapModeFullScreen);
            }

            this.setState({ now: d.getSeconds() });
        }   
    }

    onLongPress() {

    }

    onOpenAnnotation() {

    }

    centerMapAroundCurrentLocation() {
        this.centerMapAroundLocation(this.props.currentLocation.coords);
    }

    centerMapAroundLocation(coords) {
        if (coords) {
            const { latitude, longitude } = coords;
            this.map.setCenterCoordinate(latitude, longitude, true, null);
        }  
    }

    map = null;

    render() {
        const { bgColor, mapStyleFullScreen, mapStyleSmallScreen, locBtnFullScreen, locBtnSmallScreen } = styles;
        return (
            <View style={bgColor}>
                <GeoLocation />
                <MapView
                    ref={map => { this.map = map; }}                    
                    style={this.props.mapModeFullScreen ? mapStyleFullScreen : mapStyleSmallScreen}
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
                <RoundButton 
                    style={this.props.mapModeFullScreen ? locBtnFullScreen : locBtnSmallScreen} 
                    iconName='location-arrow' 
                    onPress={this.centerMapAroundCurrentLocation.bind(this)} 
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
    mapStyleFullScreen: {
        flex: 1,
        marginTop: 0,
        marginBottom: 0,
    },
    mapStyleSmallScreen: {
        flex: 1,
        marginTop: 64,
        marginBottom: 50,
    },
    locBtnFullScreen: {
        position: 'absolute',
        right: 5,
        marginTop: 51,
    },
    locBtnSmallScreen: {
        position: 'absolute',
        right: 5,
        marginTop: 115,
    }
    
};

const mapStateToProps = ({ mapReducer }) => {
    console.log(mapReducer);
    const { mapModeFullScreen, currentLocation } = mapReducer;
    return { mapModeFullScreen, currentLocation };
};


export default connect(mapStateToProps, { showMapModeFullscreen })(Map);
