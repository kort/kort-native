import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SettingsList from 'react-native-settings-list';

class SettingsOverview extends Component {

    state = { switchValue: false };

    onValueChange(value) {
        console.log('switch ', value);
        this.setState({ switchValue: value });
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
                        switchState={this.state.switchValue}
                        switchOnValueChange={this.onValueChange.bind(this)}
                        hasSwitch
                        title='Send Statistics'
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
