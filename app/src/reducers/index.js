import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MissionsReducer from './MissionsReducer';
import MapReducer from './MapReducer';
import AnswerReducer from './AnswerReducer';
import AchievementsReducer from './AchievementsReducer';
import HighscoreReducer from './HighscoreReducer';

export default combineReducers({
    authReducer: AuthReducer,
    missionReducer: MissionsReducer,
    mapReducer: MapReducer,
    answerReducer: AnswerReducer,
    achievementsReducer: AchievementsReducer,
    highscoreReducer: HighscoreReducer
});
