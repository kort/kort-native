import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MissionsReducer from './MissionsReducer';
import MapReducer from './MapReducer';

export default combineReducers({
    auth: AuthReducer,
    missionAnnotations: MissionsReducer,
    mapReducer: MapReducer
});
