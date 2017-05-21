import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SettingsList from 'react-native-settings-list';
import { mapRotationChanged, statsChanged } from '../../actions/SettingsActions';
import Config from '../../constants/Config';

class SettingsOverview extends Component {

    render() {
        return (
            <View style={styles.bgColor} >
                <SettingsList
                    defaultTitleStyle={styles.itemStyle}
                    borderColor={styles.borderColor}
                >
                    <SettingsList.Header 
                        headerText={I18n.t('settings_general_settings')}
                        headerStyle={styles.headerStyle} 
                    />
                    <SettingsList.Item
                        hasNavArrow={false}
                        switchState={this.props.stats}
                        switchOnValueChange={(value) => this.props.statsChanged(value)}
                        hasSwitch
                        title={I18n.t('settings_send_stats')}
                        titleInfo={I18n.t('settings_earn_additional_koins', 
                            { koins: Config.ADDITIONAL_KOINS_FOR_STATS })}
                        titleInfoStyle={{ fontSize: 12 }}
                    />
                    <SettingsList.Item
                        hasNavArrow={false}
                        switchState={this.props.mapRotation}
                        switchOnValueChange={(value) => this.props.mapRotationChanged(value)}
                        hasSwitch
                        title={I18n.t('settings_allow_map_rotation')}
                    />
                    <SettingsList.Header 
                        headerText={I18n.t('settings_info')}
                        headerStyle={styles.headerStyle}
                    />
                    <SettingsList.Item 
                        title={I18n.t('settings_showcase')}
                        hasNavArrow 
                        arrowStyle={styles.arrowStyle} 
                        onPress={() => Actions.showcase()} 
                    />
                    <SettingsList.Item 
                        title={I18n.t('settings_about_kort')} 
                        hasNavArrow 
                        arrowStyle={styles.arrowStyle} 
                        onPress={() => Actions.about()} 
                    />
                </SettingsList>
            </View>
        );
    }
}

const styles = {
    bgColor: {
        marginTop: (Platform.OS === 'ios') ? 64 : 54,
        backgroundColor: '#202931',
        flex: 1
    },
    headerStyle: {
        color: 'white',
        marginTop: 20,
        paddingLeft: 10
    },
    itemStyle: {
        fontSize: 15,
        color: '#395971'
    },
    arrowStyle: {
        tintColor: '#395971'
    },
    borderColor: '#395971'
};

const mapStateToProps = ({ settingsReducer }) => {
    const { stats, mapRotation } = settingsReducer;
    return { stats, mapRotation };
};


export default connect(mapStateToProps, { mapRotationChanged, statsChanged })(SettingsOverview);
