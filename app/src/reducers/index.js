import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MissionsReducer from './MissionsReducer';

export default combineReducers({
    auth: AuthReducer,
    missions: MissionsReducer
});
