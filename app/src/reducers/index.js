import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MissionsReducer from './MissionsReducer';
import MapReducer from './MapReducer';
import AnswerReducer from './AnswerReducer';

export default combineReducers({
    auth: AuthReducer,
    missionReducer: MissionsReducer,
    mapReducer: MapReducer,
    answerReducer: AnswerReducer
});
