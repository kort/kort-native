import React, { Component } from 'react';
import {
    Scene,
    Router,
    Actions
} from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
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
import { showConfirmModal, loginUserSilently, initUser, logoutUser } from './actions/AuthActions';
import { onRightClicked } from './actions/NavigationActions';

class RouterComponent extends Component {

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
                    <Scene key='missions' title={I18n.t('tab_missions')} icon={MissionsTabIcon}>
                        <Scene
                            key='missionsOverview'
                            component={MissionsOverview}
                            title={I18n.t('navbar_missions')}
                            initial
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                            leftButtonImage={{ uri: 'kort_logo_small' }}
                            leftButtonIconStyle={styles.logoStyle}
                            rightButtonImage={{ uri: 'download_icon' }}
                            rightButtonIconStyle={styles.downloadStyle}
                            onLeft={() => this.showShowcase()}
                            onRight={() => this.props.onRightClicked(true, 'mission')}
                            panHandlers={null}
                        />
                    </Scene>
                    <Scene 
                        key='achievements' 
                        title={I18n.t('tab_achievements')} 
                        icon={AchievementsTabIcon}
                    >
                        <Scene
                            key='achievementsOverview'
                            component={AchievementsOverview}
                            title={I18n.t('navbar_achievements')}
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                            leftButtonImage={{ uri: 'kort_logo_small' }}
                            leftButtonIconStyle={styles.logoStyle}
                            onLeft={() => this.showShowcase()}
                            panHandlers={null}
                        />
                    </Scene>
                    <Scene key='highscore' title={I18n.t('tab_highscore')} icon={HighscoreTabIcon}>
                        <Scene
                            key='highscoreOverview'
                            component={HighscoreOverview}
                            title={I18n.t('navbar_highscore')}
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                            leftButtonImage={{ uri: 'kort_logo_small' }}
                            leftButtonIconStyle={styles.logoStyle}
                            onLeft={() => this.showShowcase()}
                            panHandlers={null}
                        />
                    </Scene>
                    <Scene key='profile' title={I18n.t('tab_profile')} icon={ProfileTabIcon}>
                        <Scene
                            key='profileOverview'
                            component={ProfileOverview}
                            title={I18n.t('navbar_profile')}
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                            leftButtonImage={{ uri: 'kort_logo_small' }}
                            leftButtonIconStyle={styles.logoStyle}
                            onLeft={() => this.showShowcase()}
                            onRight={() => this.props.onRightClicked(true, 'profile')}
                            rightTitle=''
                            rightButtonTextStyle={styles.navBarTitleStyle}
                            panHandlers={null}
                        />
                    </Scene>
                    <Scene key='settings' title={I18n.t('tab_settings')} icon={SettingsTabIcon}>
                        <Scene
                            key='settingsOverview'
                            component={SettingsOverview}
                            title={I18n.t('navbar_settings')}
                            navigationBarStyle={styles.navBarStyle}
                            titleStyle={styles.navBarTitleStyle}
                            leftButtonImage={{ uri: 'kort_logo_small' }}
                            leftButtonIconStyle={styles.logoStyle}
                            onLeft={() => this.showShowcase()}
                            panHandlers={null}
                        />
                        <Scene
                                key='about'
                                component={About}
                                title={I18n.t('navbar_about')}
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
    },
    downloadStyle: {
        marginRight: 5, 
        height: 34, 
        width: 40  
    }
};

export default connect(null, { showConfirmModal, 
    loginUserSilently, 
    initUser, 
    logoutUser, 
    onRightClicked })(RouterComponent);
