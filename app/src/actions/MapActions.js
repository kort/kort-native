import { Actions } from 'react-native-router-flux';
import { 
    TOGGLE_MAPMODE_FULLSCREEN,
    LOCATION_UPDATE,
    LOCATION_ACCURACY_INSUFFICIENT
} from './types';

export const showMapModeFullscreen = (show) => {
    Actions.refresh({ hideTabBar: show, hideNavBar: show });
    return { 
        type: TOGGLE_MAPMODE_FULLSCREEN,
        payload: show 
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
