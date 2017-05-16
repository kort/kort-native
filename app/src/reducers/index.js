import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MissionsReducer from './MissionsReducer';
import MapReducer from './MapReducer';
import AnswerReducer from './AnswerReducer';
import OpeningHoursReducer from './OpeningHoursReducer';
import AchievementsReducer from './AchievementsReducer';
import HighscoreReducer from './HighscoreReducer';
import SettingsReducer from './SettingsReducer';
import NavigationReducer from './NavigationReducer';

export default combineReducers({
    authReducer: AuthReducer,
    missionReducer: MissionsReducer,
    mapReducer: MapReducer,
    answerReducer: AnswerReducer,
    openingHoursReducer: OpeningHoursReducer,
    achievementsReducer: AchievementsReducer,
    highscoreReducer: HighscoreReducer,
    settingsReducer: SettingsReducer,
    navigationReducer: NavigationReducer
});
