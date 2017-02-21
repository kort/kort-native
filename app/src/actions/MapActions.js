import { Actions } from 'react-native-router-flux';
import { 
    TOGGLE_MAPMODE_FULLSCREEN,
    LOCATION_UPDATE,
    LOCATION_ACCURACY_INSUFFICIENT,
    MARGIN_BOTTOM_CHANGED
} from './types';

export const showMapModeFullscreen = (show) => {
    Actions.refresh({ hideTabBar: show, hideNavBar: show });
    return { 
        type: TOGGLE_MAPMODE_FULLSCREEN,
        payload: show 
    };  
};

export const setMarginBottom = (margin) => {
    return { 
        type: MARGIN_BOTTOM_CHANGED,
        payload: margin 
    };  
};

export const locationUpdate = (location) => {
    return { 
        type: LOCATION_UPDATE,
        payload: location 
    };  
};

export const locationAccuracyInsufficient = (accuracyInsufficient) => {
    return { 
        type: LOCATION_ACCURACY_INSUFFICIENT,
        payload: accuracyInsufficient 
    };  
};
