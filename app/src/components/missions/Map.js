import React, { Component } from 'react';
import {
    View,
    Platform,
    Dimensions,
    PixelRatio
} from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import { connect } from 'react-redux';
import Config from '../../constants/Config';
import { showMapModeFullscreen } from '../../actions/MapActions';
import { downloadMissions, startMission } from '../../actions/MissionActions';
import { downloadAchievements } from '../../actions/AchievementsActions';
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
        // register tap which is not on side panel as well as any annotation
        if (tapRegion.screenCoordY > 50 && tapRegion.screenCoordX < deviceWidth - 50 &&
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
        //close mission
        this.props.onTap(); 
        this.setState({ annotationOpen: false, activeMission: {} });  
    }

    onOpenAnnotation(annotation) {
        if (this.state.currentMission !== annotation.id) {
            this.setState({ currentMission: annotation.id, annotationOpen: true });
            this.props.startMission(annotation.id);
            this.props.showMapModeFullscreen(true);
            this.props.onOpenAnnotation();

            //check if mission behind mission panel below center
            //TOOD handle rotation
            this.map.getCenterCoordinateZoomLevel(data => {
                this.map.getDirection(direction => {
                    if (annotation.latitude < data.latitude && direction === 0) {
                    this.map.setCenterCoordinate(annotation.latitude, annotation.longitude, true, null);
                    }
                });
            });
        }
    }

    onRegionDidChange() {
        console.log('region changed');
        if (this.state.annotationOpen) {
            this.map.selectAnnotation(this.props.activeMission.id);
        }
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
                    onRegionDidChange={this.onRegionDidChange.bind(this)}
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

const deviceWidth = Dimensions.get('window').width * PixelRatio.get();

const styles = {
    bgColor: {
        backgroundColor: '#395971',
        flex: 1,
    },
    mapStyleFullScreen: {
        flex: 1,
        marginTop: 0,
        marginBottom: 0
    },
    mapStyleSmallScreen: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 64 : 54,
        marginBottom: 50
    },
    locBtnFullScreen: {
        position: 'absolute',
        right: (Platform.OS === 'ios') ? 5 : 13,
        marginTop: (Platform.OS === 'ios') ? 51 : 72,
    },
    locBtnSmallScreen: {
        position: 'absolute',
        right: (Platform.OS === 'ios') ? 5 : 13,
        marginTop: (Platform.OS === 'ios') ? 115 : 126,
    }
    
};

const mapStateToProps = ({ mapReducer, missionReducer }) => {
    console.log(missionReducer);
    const { mapModeFullScreen, currentLocation } = mapReducer;
    const { missionAnnotations, activeMission } = missionReducer;
    return { mapModeFullScreen, currentLocation, missionAnnotations, activeMission };
};


export default connect(mapStateToProps, 
    { showMapModeFullscreen, downloadMissions, startMission, downloadAchievements })(Map);
