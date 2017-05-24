import {
    MISSIONS_DOWNLOAD,
    MISSIONS_DOWNLOADED_SUCCESS,
    MISSIONS_DOWNLOADED_ERROR,
    MISSIONS_CLEAR_ERROR_MSG,
    START_MISSION,
    SHOW_MISSION,
    DOWNLOAD_MISSION_GEOMETRY
 } from '../actions/types';
import Config from '../constants/Config';

const INITIAL_STATE = {
    activeMission: {},
    missionAnnotations: [],
    missionsData: [],
    missionsLoading: false,
    coordsOfDownload: { latitude: 0, longitude: 0 },
    errorMsg: null,
    missionViewHeight: 300,
    missionViewVisible: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {    
        case SHOW_MISSION:
            return { ...state, missionViewVisible: action.payload };      
        case MISSIONS_DOWNLOAD:
            return { ...state, missionsLoading: true };        
        case MISSIONS_DOWNLOADED_ERROR:
            return { ...state, missionsLoading: false, errorMsg: action.payload };
        case MISSIONS_DOWNLOADED_SUCCESS:
            return { ...state, 
                missionsLoading: false, 
                missionsData: action.payload.data, 
                missionAnnotations: createMissionAnnotations(action.payload.data, null), 
                coordsOfDownload: action.payload.coords === null ? 
                    state.coordsOfDownload : action.payload.coords 
            };
        case DOWNLOAD_MISSION_GEOMETRY:
            return { ...state, 
                missionAnnotations: createMissionAnnotations(state.missionsData, action.payload)
            };
        case START_MISSION:
            return { ...state, 
                activeMission: action.payload.mission, 
                missionViewHeight: action.payload.height };
        case MISSIONS_CLEAR_ERROR_MSG:
            return { ...state, errorMsg: null };  
        default:
            return state;
    }
};

export const createMissionAnnotations = (data, highlightedGeometry) => {
    const annotations = [];
    for (const mission of data) {
        if (highlightedGeometry && highlightedGeometry.geom) {
            //TODO polygon -> relation
                let mapboxType = 'point';
                if (highlightedGeometry.type === 'way') {
                    mapboxType = 'polyline';
                } else if (highlightedGeometry.type === 'relation') {
                    mapboxType = 'polygon';
                }
                annotations.push({
                id: 'geom',
                type: mapboxType,
                coordinates: highlightedGeometry.geom,
                strokeColor: '#395971',
                strokeAlpha: 0.6,
                fillAlpha: 0.6,
                fillColor: '#395971'
            });
        }
        annotations.push({
            id: mission.id,
            type: 'point',
            title: mission.title,
            coordinates: mission.annotationCoordinate,
            annotationImage: {
                source: { uri: `${mission.image}` },
                width: Config.MAPBOX_ANNOTATION_SIZE,
                height: Config.MAPBOX_ANNOTATION_SIZE
            },
        });
    }
    return annotations;
};

