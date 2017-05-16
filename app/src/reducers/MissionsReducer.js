import {
    MISSIONS_DOWNLOAD,
    MISSIONS_DOWNLOADED_SUCCESS,
    MISSIONS_DOWNLOADED_ERROR,
    MISSIONS_CLEAR_ERROR_MSG,
    START_MISSION
 } from '../actions/types';
import Config from '../constants/Config';

const INITIAL_STATE = {
    activeMission: {},
    missionAnnotations: [],
    missionsData: [],
    missionsLoading: false,
    coordsOfDownload: { latitude: 0, longitude: 0 },
    errorMsg: null,
    missionViewHeight: 300
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {        
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
        case START_MISSION:
            return { ...state, 
                activeMission: action.payload.mission, 
                missionViewHeight: action.payload.height,
                missionAnnotations: createMissionAnnotations(
                    action.payload.data, action.payload.id) };
        case MISSIONS_CLEAR_ERROR_MSG:
            return { ...state, errorMsg: null };  
        default:
            return state;
    }
};

export const createMissionAnnotations = (data, highlightedFeature) => {
    const annotations = [];
    for (const mission of data) {
        // if (highlightedFeature === mission.id && mission.geomType !== 'point') {
        //         annotations.push({
        //         id: 'geom',
        //         type: mission.geomType,
        //         coordinates: mission.coordinates,
        //         strokeColor: '#395971',
        //         strokeAlpha: 0.6,
        //         fillAlpha: 0.6,
        //         fillColor: '#395971'
        //     });
        // }
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

