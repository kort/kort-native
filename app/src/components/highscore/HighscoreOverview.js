import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import HighscoreList from './HighscoreList';
import { connect } from 'react-redux';
import { tabChanged } from '../../actions/HighscoreActions';

class HighscoreOverview extends Component {

    changeTab(index) {
        this.props.tabChanged(index);
    }

    render() {
        return (
            <View style={styles.bgColor} >
                    <SegmentedControlTab
                    tabsContainerStyle={styles.tabsContainerStyle}
                    tabStyle={styles.tabStyle}
                    activeTabStyle={styles.activeTabStyle}
                    tabTextStyle={styles.tabTextStyle}
                    values={tabCategories}
                    onTabPress={index => this.changeTab(index)}
                    />
                    <HighscoreList 
                        style={styles.listStyle} 
                    />
            </View>
        );
    }
}

const tabCategories = ['Day', 'Week', 'Month', 'All Time'];

const styles = {
    bgColor: {
        marginTop: (Platform.OS === 'ios') ? 64 : 54,
        backgroundColor: '#202931',
        flex: 1
    },
    tabsContainerStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#395971',
        height: 60,
    },
    tabTextStyle: {
        color: '#395971',
        backgroundColor: 'transparent'        
    },
    tabStyle: {
        backgroundColor: 'white',
        borderColor: '#395971',
        borderWidth: (Platform.OS === 'ios') ? 0 : 1,
    },
    activeTabStyle: {
        backgroundColor: '#395971'
    },
    listStyle: {
        flex: 1,

    }
};

export default connect(null, { tabChanged })(HighscoreOverview);
