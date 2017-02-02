import { Actions } from 'react-native-router-flux';
import { 
    TOGGLE_MAPMODE_FULLSCREEN
} from './types';

export const showMapModeFullscreen = (show) => {
    Actions.refresh({ hideTabBar: show, hideNavBar: show });
    return { 
        type: TOGGLE_MAPMODE_FULLSCREEN,
        payload: show 
    };  
};
