import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import HighscoreList from './HighscoreList';
import { connect } from 'react-redux';
import { tabChanged, clearErrorMsg } from '../../actions/HighscoreActions';
import { Spinner, Popup } from '../common';

class HighscoreOverview extends Component {

    onAccept() {
        this.props.clearErrorMsg();
    }

    changeTab(index) {
        this.props.tabChanged(index);
    }

    renderSpinner() {
        if (this.props.downloading) {
            return (
                <Spinner
                    size='large'
                    style={styles.spinnerStyle}
                />
            );
        }
        return null;
    }

    render() {
        return (
            <View style={styles.bgColor} >
                {this.renderSpinner()}
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
                <Popup
                        visible={this.props.errorMsg !== null}
                        onAccept={this.onAccept.bind(this)}
                        message='There was an error connecting to the server. Check your connectivity.'
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

    },
    spinnerStyle: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
};

const mapStateToProps = ({ highscoreReducer }) => {
    const { downloading, errorMsg } = highscoreReducer;
    return { downloading, errorMsg };
};

export default connect(mapStateToProps, { tabChanged, clearErrorMsg })(HighscoreOverview);
