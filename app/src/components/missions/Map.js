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
import CoordinateCalculations from '../../geolocation/CoordinateCalculations';
import { RoundButton } from '../common';

class Map extends Component {

    state = { firstTapAt: 0, annotationOpen: false, annotationOpenedAt: 0, regionChange: false };

    componentDidMount() {
        console.log(Config.MAPBOX_ACCESS_TOKEN);
        Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
    }

    componentWillReceiveProps(nextProps) {
        //fetch missions if location has changed
        if (nextProps.currentLocation.coords) {
            if (!this.props.missionsLoading && this.props.errorMsg === null && CoordinateCalculations.calculateDistance(this.props.coordsOfDownload, nextProps.currentLocation.coords) 
            > Config.DISTANCE_DIFF_IN_M_FOR_MISSION_FETCHING) {
                this.props.downloadMissions(nextProps.currentLocation.coords, Config.RADIUS_IN_M_FOR_MISSION_FETCHING); 
            }
        }
        
        let lastLocation = '';
        if (this.props && this.props.currentLocation) {
            lastLocation = this.props.currentLocation;
        }

        if (nextProps.currentLocation && (lastLocation !== nextProps.currentLocation)) {
            console.log(nextProps.currentLocation.coords);
            this.centerMapAroundLocation(nextProps.currentLocation.coords);
        }

        // detect metric changes
        if (this.props.stats !== nextProps.stats) {
            Mapbox.setMetricsEnabled(nextProps.stats);
        }
    }

    onTap() {
        console.log('tap');       
        const d = new Date();
        const now = d.getTime();
        if (now - this.state.firstTapAt > 500) {
            setTimeout(() => {
                this.toggleFullscreen();
            }, 500);        
        }
        this.props.onTap(); 
        this.setState({ firstTapAt: d.getTime(), annotationOpen: false, activeMission: {} }); 
    }

    onRegionDidChange() {
        console.log('region changed');
        if (this.state.annotationOpen) {
            this.setState({ regionChange: true });
            this.map.selectAnnotation(this.props.activeMission.id);
        }
    }

    onOpenAnnotation(annotation) {
        const d = new Date();
        this.setState({ annotationOpenedAt: d.getTime() });

        if (this.state.currentMission !== annotation.id) {
            this.handleAnnotationOpen(annotation);
        } else {
            if (!this.state.regionChange && !this.state.annotationOpen) {
                this.handleAnnotationOpen(annotation);
            }
            this.setState({ regionChange: false });
        }
    }

    toggleFullscreen() {
        const d = new Date();
        const now = d.getTime();
        // 500ms between taps for not zooming, 500ms for not toggling when clicking on annotation
        if (now - this.state.annotationOpenedAt > 500) {
            if (now - this.state.firstTapAt > 500 && Platform.OS === 'ios') {
                this.props.showMapModeFullscreen(!this.props.mapModeFullScreen);
            } else if (Platform.OS === 'android') {
                this.props.showMapModeFullscreen(!this.props.mapModeFullScreen);
            }
        }
    }

    handleAnnotationOpen(annotation) {
        this.setState({ currentMission: annotation.id, annotationOpen: true });
            this.props.startMission(this.props.missionsData, annotation.id);
            this.props.showMapModeFullscreen(true);
            this.props.onOpenAnnotation();

            //check if mission behind mission panel below center
            // this.map.getCenterCoordinateZoomLevel(data => {
            //     this.map.getDirection(direction => {
            //         if (annotation.latitude < data.latitude && direction === 0) {
            //             this.map.setCenterCoordinate(annotation.latitude, annotation.longitude, true, null);
            //         }
            //     });
            // });
            this.map.setCenterCoordinateZoomLevel(annotation.latitude, annotation.longitude, Config.MAPBOX_MISSION_ZOOM_LEVEL, true, null);
    }

    centerMapAroundCurrentLocation() {
        this.centerMapAroundLocation(this.props.currentLocation.coords);
    }

    centerMapAroundLocation(coords) {
        if (coords) {
            const { latitude, longitude } = coords;
            this.map.getCenterCoordinateZoomLevel(data => {
                const initialZoom = Config.MAPBOX_INITIAL_ZOOM_LEVEL;
                const zoom = initialZoom > data.zoomLevel ? initialZoom : data.zoomLevel;
                this.map.setCenterCoordinateZoomLevel(latitude, longitude, 
                zoom, true, null);
            });   
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
                    styleURL={styleURL}
                    attributionButtonIsHidden
                    rotateEnabled={this.props.mapRotation}
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

const styleURL = Config.MAPBOX_STYLE_URL ? Config.MAPBOX_STYLE_URL : Mapbox.mapStyles.streets;

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

const mapStateToProps = ({ mapReducer, missionReducer, settingsReducer }) => {
    const { mapModeFullScreen, currentLocation } = mapReducer;
    const { missionAnnotations, activeMission, missionsData, missionsLoading, coordsOfDownload, errorMsg } = missionReducer;
    const { stats, mapRotation } = settingsReducer;
    return { mapModeFullScreen, currentLocation, missionAnnotations, activeMission, missionsData, missionsLoading, coordsOfDownload, errorMsg, stats, mapRotation };
};


export default connect(mapStateToProps, 
    { showMapModeFullscreen, downloadMissions, startMission, downloadAchievements })(Map);
