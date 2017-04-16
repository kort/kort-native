import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SettingsList from 'react-native-settings-list';
import store from 'react-native-simple-store';
import { SETTINGS } from '../../storage/StorageKeys';

class SettingsOverview extends Component {

    state = { stats: false, mapRotation: false };

    componentDidMount() {
        store.get(SETTINGS).then(settings => {
            if (settings !== null) {
                this.setState(settings);
            }
        });  
    }

    switchChanged(obj) {
        this.setState(obj);        
        store.update(SETTINGS, obj);

        //TODO show message that changes are available after restart
    }

    render() {
        return (
            <View style={styles.bgColor} >
                <SettingsList
                    defaultTitleStyle={styles.itemStyle}
                    borderColor={styles.borderColor}
                >
                    <SettingsList.Header 
                        headerText='General Settings' 
                        headerStyle={styles.headerStyle} 
                    />
                    <SettingsList.Item
                        hasNavArrow={false}
                        switchState={this.state.stats}
                        switchOnValueChange={(value) => this.switchChanged({ stats: value })}
                        hasSwitch
                        title='Send Statistics'
                        titleInfo='Earn additional Koins'
                        titleInfoStyle={{ fontSize: 12 }}
                    />
                    <SettingsList.Item
                        hasNavArrow={false}
                        switchState={this.state.mapRotation}
                        switchOnValueChange={(value) => this.switchChanged({ mapRotation: value })}
                        hasSwitch
                        title='Allow Map Rotation'
                    />
                    <SettingsList.Header 
                        headerText='Info' 
                        headerStyle={styles.headerStyle}
                    />
                    <SettingsList.Item 
                        title='Showcase' 
                        hasNavArrow 
                        arrowStyle={styles.arrowStyle} 
                        onPress={() => Actions.showcase()} 
                    />
                    <SettingsList.Item 
                        title='About Kort' 
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

export default (SettingsOverview);
