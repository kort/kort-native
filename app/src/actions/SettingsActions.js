import store from 'react-native-simple-store';
import { 
    MAP_ROTATION_CHANGED,
    STATS_CHANGED,
    APP_SETTINGS_LOADED
} from './types';
import { SETTINGS } from '../storage/StorageKeys';

export const mapRotationChanged = (value) => {
    store.update(SETTINGS, { mapRotation: value });
    return { 
        type: MAP_ROTATION_CHANGED,
        payload: value 
    };  
};

export const statsChanged = (value) => {
    store.update(SETTINGS, { stats: value });
    return { 
        type: STATS_CHANGED,
        payload: value 
    };  
};

export const setAppSettingsLoaded = () => {
    return { 
        type: APP_SETTINGS_LOADED,
        payload: true 
    };  
};
