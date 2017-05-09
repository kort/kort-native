/* eslint-disable react/no-multi-comp */
import React from 'react';
import { 
    Text, 
    View,
    Dimensions
 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabIcon = ({ title, selected, iconName }) => {
    const { tabIconStyle,
            tabIconStyleUnselected,
            tabIconStyleSelected,
            iconStyle,
            iconStyleSelected,
            iconStyleUnselected } = styles;
    return (
        <View style={tabIconStyle}>
        <Icon 
            style={[iconStyle, selected ? tabIconStyleSelected : tabIconStyleUnselected]}
            name={iconName}
        /> 
        <Text style={selected ? iconStyleSelected : iconStyleUnselected}>{title}</Text>
        </View>
    );
};

const deviceWidth = Dimensions.get('window').width;

const MissionsTabIcon = ({ title, selected }) => {
  return <TabIcon title={title} selected={selected} iconName='map' />;
};

const AchievementsTabIcon = ({ title, selected }) => {  
  return <TabIcon title={title} selected={selected} iconName='trophy' />;
};

const HighscoreTabIcon = ({ title, selected }) => {
  return <TabIcon title={title} selected={selected} iconName='list-ol' />;
};

const ProfileTabIcon = ({ title, selected }) => {
  return <TabIcon title={title} selected={selected} iconName='user-circle-o' />;
};

const SettingsTabIcon = ({ title, selected }) => {
  return <TabIcon title={title} selected={selected} iconName='gear' />;
};

const styles = {
    tabIconStyle: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabIconStyleUnselected: {
        color: '#657C8E'
    },
    tabIconStyleSelected: {
        color: '#ffffff'
    },
    iconStyle: {
        fontSize: 28,
        paddingBottom: 2
    },
    iconStyleUnselected: {
        color: '#657C8E',
        fontSize: (deviceWidth <= 320) ? 9 : 10
    },
    iconStyleSelected: {
        color: '#ffffff',
        fontSize: (deviceWidth <= 320) ? 9 : 10
    }
};

module.exports = { MissionsTabIcon, 
    AchievementsTabIcon, 
    HighscoreTabIcon, 
    ProfileTabIcon, 
    SettingsTabIcon };
