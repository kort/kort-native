import React from 'react';
import {
    Scene,
    Router
} from 'react-native-router-flux';
import MissionsOverview from './components/missions/MissionsOverview';
import AchievementsOverview from './components/achievements/AchievementsOverview';
import HighscoreOverview from './components/highscore/HighscoreOverview';
import ProfileOverview from './components/profile/ProfileOverview';

import {
    MissionsTabIcon,
    AchievementsTabIcon,
    HighscoreTabIcon,
    ProfileTabIcon
} from './components/common/TabIcons';

const RouterComponent = () => {
    return (
        <Router>

            <Scene key='root'>
                <Scene
                    key='tabbar'
                    tabs
                    tabBarStyle={styles.tabBarStyle}
                >
                    <Scene key='missions' title='Missions' icon={MissionsTabIcon}>
                        <Scene
                            key='missionsOverview'
                            component={MissionsOverview}
                            title='Missions'
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                        />
                    </Scene>
                    <Scene key='achievements' title='Achievements' icon={AchievementsTabIcon}>
                        <Scene
                            key='achievementsOverview'
                            component={AchievementsOverview}
                            title='Achievements'
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                        />
                    </Scene>
                    <Scene key='highscore' title='Highscore' icon={HighscoreTabIcon}>
                        <Scene
                            key='highscoreOverview'
                            component={HighscoreOverview}
                            title='Highscore'
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                        />
                    </Scene>
                    <Scene key='profile' title='Profile' icon={ProfileTabIcon}>
                        <Scene
                            key='profileOverview'
                            component={ProfileOverview}
                            title='Profile'                            
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                        />
                    </Scene>
                </Scene>
            </Scene>
        </Router>
    );
};

const styles = {
    tabBarStyle: {
        backgroundColor: '#212327'
    },
    navBarStyle: {
        backgroundColor: '#212327'
    },
    navBarTitleStyle: {
        color: 'white'
    }
};

export default RouterComponent;