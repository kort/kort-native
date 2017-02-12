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

    state = { now: 0, annotationOpen: false };

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
        console.log('tap');
        if (tapRegion.screenCoordY > 50 && 
        !this.tapOnAnnotation(tapRegion, this.props.missionAnnotations) &&
        !this.state.annotationOpen) {
            const d = new Date();
            if (Math.abs(d.getSeconds() - this.state.now) <= 1) {
                console.log('zoom');
            } else {
                console.log('fullscreen toggle');
                this.props.showMapModeFullscreen(!this.props.mapModeFullScreen);
            }

            this.setState({ now: d.getSeconds() });
        }
        this.props.onTap();   
    }

    onOpenAnnotation(annotation) {
        console.log('open annotation');
        this.props.showMapModeFullscreen(true);
        this.props.onOpenAnnotation();

        // this.map.getCenterCoordinateZoomLevel(data => {
        //     // does not work when map rotated
        //             const zoom = data.zoomLevel;
        //             const lat = annotation.latitude-0.01;   //TODO according to zoom level
        //             const lon = annotation.longitude;
        //             this.map.setCenterCoordinate(lat, lon, true, null);
        // });
    }

    tapOnAnnotation(region, annotations) {
        const precision = 3; //TODO according to current zoom level
        for (const annotation of annotations) {
            if (annotation.coordinates[0].toFixed(precision) === region.latitude.toFixed(precision)
            && annotation.coordinates[1].toFixed(precision) === region.longitude.toFixed(precision)) {
                return true;
            }
        }
        return false;
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
        const { bgColor, mapStyleFullScreen, mapStyleSmallScreen, 
            locBtnFullScreen, locBtnSmallScreen } = styles;
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
                    onOpenAnnotation={this.onOpenAnnotation.bind(this)}
                    onTap={this.onTap.bind(this)}
                    annotations={this.props.missionAnnotations}
                />
                <RoundButton 
                    style={this.props.mapModeFullScreen ? locBtnFullScreen : locBtnSmallScreen} 
                    iconName='my-location' 
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

const mapStateToProps = ({ mapReducer, missionAnnotations }) => {
    console.log(missionAnnotations);
    const { mapModeFullScreen, currentLocation } = mapReducer;
    return { mapModeFullScreen, currentLocation, missionAnnotations };
};


export default connect(mapStateToProps, { showMapModeFullscreen })(Map);
