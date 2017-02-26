import React, { Component } from 'react';
import {
    Scene,
    Router,
    Actions
} from 'react-native-router-flux';
import { connect } from 'react-redux';
import MissionsOverview from './components/missions/MissionsOverview';
import AchievementsOverview from './components/achievements/AchievementsOverview';
import HighscoreOverview from './components/highscore/HighscoreOverview';
import ProfileOverview from './components/profile/ProfileOverview';
import LoginOverview from './components/login/LoginOverview';
import {
    MissionsTabIcon,
    AchievementsTabIcon,
    HighscoreTabIcon,
    ProfileTabIcon
} from './components/common/TabIcons';
import { logoutUser } from './actions/AuthActions';

class RouterComponent extends Component {

    logInOrOut() {
        if (this.props.loggedIn) {
            this.props.logoutUser();
        }
        Actions.pop();
    }

    // <Scene key='auth' component={LoginOverview} hideNavBar />
    render() {
        return (
        <Router>

            <Scene key='auth' component={LoginOverview} hideNavBar />

            <Scene key='root' animation='fade'>
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
                            initial
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
                            onRight={this.logInOrOut.bind(this)}
                            rightTitle=''
                            rightButtonTextStyle={styles.navBarTitleStyle}
                        />
                    </Scene>
                </Scene>
            </Scene>
        </Router>
        );
    }
}

const styles = {
    tabBarStyle: {
        backgroundColor: '#395971'
    },
    navBarStyle: {
        backgroundColor: '#395971',
        borderBottomColor: '#395971'
    },
    navBarTitleStyle: {
        color: 'white'
    },
};

const mapStateToProps = ({ authReducer }) => {
    const { loggedIn } = authReducer;
    return { loggedIn };
};

export default connect(mapStateToProps, { logoutUser })(RouterComponent);
