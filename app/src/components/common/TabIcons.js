/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Text, View, Image } from 'react-native';

const TabIcon = ({ title, selected, icon }) => {
    const { tabIconStyle,
            tabIconStyleUnselected,
            tabIconStyleSelected,
            iconStyle,
            iconStyleSelected,
            iconStyleUnselected } = styles;
    return (
        <View style={tabIconStyle}>
        <Image 
            style={[iconStyle, selected ? tabIconStyleSelected : tabIconStyleUnselected]}
            source={icon}
        />
        <Text style={selected ? iconStyleSelected : iconStyleUnselected}>{title}</Text>
        </View>
    );
};

const MissionsTabIcon = ({ title, selected }) => {
  const icon = require('../../../assets/images/tabIcons/missions.png');

  return <TabIcon title={title} selected={selected} icon={icon} />;
};

const AchievementsTabIcon = ({ title, selected }) => {
  const icon = require('../../../assets/images//tabIcons/achievements.png');
  
  return <TabIcon title={title} selected={selected} icon={icon} />;
};

const HighscoreTabIcon = ({ title, selected }) => {
  const icon = require('../../../assets/images//tabIcons/highscore.png');
  
  return <TabIcon title={title} selected={selected} icon={icon} />;
};

const ProfileTabIcon = ({ title, selected }) => {
  const icon = require('../../../assets/images//tabIcons/profile.png');
  
  return <TabIcon title={title} selected={selected} icon={icon} />;
};
const styles = {
    tabIconStyle: {
        backgroundColor: '#212327',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabIconStyleUnselected: {
        tintColor: '#87888c'
    },
    tabIconStyleSelected: {
        tintColor: '#3ad263'
    },
    iconStyle: {
        height: 30,
        width: 30
    },
    iconStyleUnselected: {
        color: '#87888c'
    },
    iconStyleSelected: {
        color: '#3ad263'
    }
};

module.exports = { MissionsTabIcon, AchievementsTabIcon, HighscoreTabIcon, ProfileTabIcon };
