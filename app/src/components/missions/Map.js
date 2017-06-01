import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import { connect } from 'react-redux';
import Config from '../../constants/Config';
import { showMapModeFullscreen, updateCenterCoordinates } from '../../actions/MapActions';
import { downloadMissions, startMission, downloadMissionGeometry } from '../../actions/MissionActions';
import { onRightClicked } from '../../actions/NavigationActions';
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
            if (!this.props.missionsLoading && this.props.errorMsg === null && 
            CoordinateCalculations.calculateDistance(
                this.props.coordsOfDownload, nextProps.currentLocation.coords) 
            > Config.DISTANCE_DIFF_IN_M_FOR_MISSION_FETCHING) {
                this.props.downloadMissions(
                    nextProps.currentLocation.coords, Config.RADIUS_IN_M_FOR_MISSION_FETCHING, false); 
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

        if (nextProps.currentView === 'mission' && nextProps.rightClicked) {
            this.props.downloadMissions(this.props.centerCoordinates, Config.RADIUS_IN_M_FOR_MISSION_FETCHING, true);
            this.props.onRightClicked(false, '');
        }
    }

    onTap() {
        console.log('tap');       
        const d = new Date();
        const now = d.getTime();
        if (now - this.state.firstTapAt > Config.MAPBOX_TAP_DELAY_IN_MS) {
            setTimeout(() => {
                this.toggleFullscreen();
            }, Config.MAPBOX_TAP_DELAY_IN_MS);        
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
        this.map.getCenterCoordinateZoomLevel(data => {
            this.props.updateCenterCoordinates(data);
        });
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
        if (now - this.state.annotationOpenedAt > Config.MAPBOX_TAP_DELAY_IN_MS) {
            if (now - this.state.firstTapAt > Config.MAPBOX_TAP_DELAY_IN_MS && Platform.OS === 'ios') {
                this.props.showMapModeFullscreen(!this.props.mapModeFullScreen);
            } else if (Platform.OS === 'android') {
                this.props.showMapModeFullscreen(!this.props.mapModeFullScreen);
            }
        }
    }

    handleAnnotationOpen(annotation) {
        this.setState({ currentMission: annotation.id, annotationOpen: true });
            this.props.startMission(this.props.missionsData, annotation.id);
            this.props.downloadMissionGeometry(this.props.missionsData, annotation.id);
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
            this.map.setCenterCoordinateZoomLevel(
                annotation.latitude, annotation.longitude, 
                Config.MAPBOX_MISSION_ZOOM_LEVEL, true, null);
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

    toggleLayer() {
        const oldStyle = Config.MAPBOX_STYLE_URL ? Config.MAPBOX_STYLE_URL : Mapbox.mapStyles.streets;
        const newStyle = Mapbox.mapStyles.satellite;
        if (styleURL === oldStyle) {
            styleURL = newStyle;
        } else {
            styleURL = oldStyle;
        }
    }

    map = null;

    render() {
        const { bgColor, mapStyleFullScreen, mapStyleSmallScreen, 
            locBtnFullScreen, locBtnSmallScreen, satBtnSmallScreen, satBtnFullScreen } = styles;
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
                <RoundButton 
                    style={this.props.mapModeFullScreen ? satBtnFullScreen : satBtnSmallScreen} 
                    iconName='layers' 
                    onPress={this.toggleLayer.bind(this)} 
                />
            </View>
        );
    }
}

let styleURL = Config.MAPBOX_STYLE_URL ? Config.MAPBOX_STYLE_URL : Mapbox.mapStyles.streets;

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
    },
    satBtnFullScreen: {
        position: 'absolute',
        right: (Platform.OS === 'ios') ? 5 : 13,
        marginTop: (Platform.OS === 'ios') ? 51 + 50 : 72 + 50,
    },
    satBtnSmallScreen: {
        position: 'absolute',
        right: (Platform.OS === 'ios') ? 5 : 13,
        marginTop: (Platform.OS === 'ios') ? 115 + 50 : 126 + 50,
    }
    
};

const mapStateToProps = ({ mapReducer, missionReducer, settingsReducer, navigationReducer }) => {
    const { mapModeFullScreen, currentLocation, centerCoordinates } = mapReducer;
    const { missionAnnotations, activeMission, missionsData, 
        missionsLoading, coordsOfDownload, errorMsg } = missionReducer;
    const { stats, mapRotation } = settingsReducer;
    const { rightClicked, currentView } = navigationReducer;
    return { mapModeFullScreen, 
        currentLocation, 
        missionAnnotations, 
        activeMission, 
        missionsData, 
        missionsLoading, 
        coordsOfDownload, 
        errorMsg, 
        stats, 
        mapRotation,
        rightClicked,
        currentView,
        centerCoordinates };
};


export default connect(mapStateToProps, 
    { showMapModeFullscreen, downloadMissions, startMission, downloadMissionGeometry, updateCenterCoordinates, onRightClicked })(Map);
