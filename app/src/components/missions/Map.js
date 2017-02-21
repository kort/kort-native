import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import { connect } from 'react-redux';
import Config from '../../constants/Config';
import { showMapModeFullscreen, setMarginBottom } from '../../actions/MapActions';
import { downloadMissions, startMission } from '../../actions/MissionActions';
import GeoLocation from '../../geolocation/GeoLocation';
import { RoundButton } from '../common';

class Map extends Component {

    state = { now: 0, annotationOpen: false };

    componentDidMount() {
        console.log(Config.MAPBOX_ACCESS_TOKEN);
        Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
        Mapbox.setMetricsEnabled(false);

        //TODO move this to other area
        this.props.downloadMissions();
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
                this.props.setMarginBottom(this.props.mapModeFullScreen ? 50 : 0);
            }

            this.setState({ now: d.getSeconds() });
        }
        this.props.onTap();   
    }

    onOpenAnnotation(annotation) {
        this.props.startMission(annotation.id);
        this.props.showMapModeFullscreen(true);
        this.props.onOpenAnnotation();

        this.setState({ bottomMargin: 300 });

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
                    style={[this.props.mapModeFullScreen ? mapStyleFullScreen : mapStyleSmallScreen, { marginBottom: this.props.marginBottom }]}
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
        backgroundColor: '#395971',
        flex: 1,
    },
    mapStyleFullScreen: {
        flex: 1,
        marginTop: 0,
    },
    mapStyleSmallScreen: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 64 : 54,
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

const mapStateToProps = ({ mapReducer, missionReducer }) => {
    console.log(missionReducer);
    const { mapModeFullScreen, currentLocation, marginBottom } = mapReducer;
    const { missionAnnotations } = missionReducer;
    return { mapModeFullScreen, currentLocation, marginBottom, missionAnnotations };
};


export default connect(mapStateToProps, 
    { showMapModeFullscreen, downloadMissions, setMarginBottom, startMission })(Map);
