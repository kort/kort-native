import React, { Component } from 'react';
import {
    Scene,
    Router,
    Actions
} from 'react-native-router-flux';
import { connect } from 'react-redux';
import store from 'react-native-simple-store';
import Showcase from './components/showcase/Showcase';
import MissionsOverview from './components/missions/MissionsOverview';
import AchievementsOverview from './components/achievements/AchievementsOverview';
import HighscoreOverview from './components/highscore/HighscoreOverview';
import ProfileOverview from './components/profile/ProfileOverview';
import SettingsOverview from './components/settings/SettingsOverview';
import About from './components/settings/About';
import LoginOverview from './components/login/LoginOverview';
import {
    MissionsTabIcon,
    AchievementsTabIcon,
    HighscoreTabIcon,
    ProfileTabIcon,
    SettingsTabIcon
} from './components/common/TabIcons';
import { showConfirmModal } from './actions/AuthActions';
import { SHOWCASE_SHOWN } from './storage/StorageKeys';

class RouterComponent extends Component {

    componentWillMount() {
        store.get(SHOWCASE_SHOWN).then(obj => {
            if (obj !== null) {
                if (!obj.showcaseShown) {
                    this.showShowcase();
                    store.update(SHOWCASE_SHOWN, { showcaseShown: true });
                }
            } else {
                store.update(SHOWCASE_SHOWN, { showcaseShown: true });
            }           
        });       
    }

    logInOrOut() {
        if (this.props.loggedIn) {
            this.props.showConfirmModal(true);        
        } else {
            Actions.pop();
        }
    }

    showShowcase() {
        Actions.showcase();
    }

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
                            leftButtonImage={{ uri: 'kort_logo_small' }}
                            leftButtonIconStyle={styles.logoStyle}
                            onLeft={() => this.showShowcase()}
                        />
                    </Scene>
                    <Scene key='achievements' title='Achievements' icon={AchievementsTabIcon}>
                        <Scene
                            key='achievementsOverview'
                            component={AchievementsOverview}
                            title='Achievements'
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                            leftButtonImage={{ uri: 'kort_logo_small' }}
                            leftButtonIconStyle={styles.logoStyle}
                            onLeft={() => this.showShowcase()}
                        />
                    </Scene>
                    <Scene key='highscore' title='Highscore' icon={HighscoreTabIcon}>
                        <Scene
                            key='highscoreOverview'
                            component={HighscoreOverview}
                            title='Highscore'
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                            leftButtonImage={{ uri: 'kort_logo_small' }}
                            leftButtonIconStyle={styles.logoStyle}
                            onLeft={() => this.showShowcase()}
                        />
                    </Scene>
                    <Scene key='profile' title='Profile' icon={ProfileTabIcon}>
                        <Scene
                            key='profileOverview'
                            component={ProfileOverview}
                            title='Profile'                            
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                            leftButtonImage={{ uri: 'kort_logo_small' }}
                            leftButtonIconStyle={styles.logoStyle}
                            onLeft={() => this.showShowcase()}
                            onRight={this.logInOrOut.bind(this)}
                            rightTitle=''
                            rightButtonTextStyle={styles.navBarTitleStyle}
                        />
                    </Scene>
                    <Scene key='settings' title='Settings' icon={SettingsTabIcon}>
                        <Scene
                            key='settingsOverview'
                            component={SettingsOverview}
                            title='Settings'                            
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                            leftButtonImage={{ uri: 'kort_logo_small' }}
                            leftButtonIconStyle={styles.logoStyle}
                            onLeft={() => this.showShowcase()}
                        />
                        <Scene
                                key='about'
                                component={About}
                                title='About'
                                navigationBarStyle={styles.navBarStyle}
                                titleStyle={styles.navBarTitleStyle}
                                leftButtonIconStyle={{ tintColor: 'white' }}
                        />
                    </Scene>
                </Scene>
            </Scene>

            <Scene key='showcase' component={Showcase} hideNavBar animation='fade' />
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
    logoStyle: { 
        marginLeft: 5, 
        height: 40, 
        width: 48 
    }
};

const mapStateToProps = ({ authReducer }) => {
    const { loggedIn } = authReducer;
    return { loggedIn };
};

export default connect(mapStateToProps, { showConfirmModal })(RouterComponent);
