import React, { Component } from 'react';
import {
    View,
    ListView,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import AchievementItem from './AchievementItem';
import { downloadAchievements, clearErrorMsg } from '../../actions/AchievementsActions';
import { Spinner, Popup } from '../common';

class AchievementsOverview extends Component {

    componentWillMount() {
        this.props.downloadAchievements(false);
    }

    onAccept() {
        this.props.clearErrorMsg();
    }

    onRefresh() {
        this.props.downloadAchievements(true);
    }

    renderRow(rowData) {
        if (_.isEmpty(rowData)) {
            return <View style={styles.itemStyle} />;
        }
        return <AchievementItem achievement={rowData} />;
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
            <View style={styles.bgColor}>
                {this.renderSpinner()}
                <ListView 
                    contentContainerStyle={styles.list}
                    dataSource={this.props.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                    initialListSize={15}
                    enableEmptySections
                    refreshControl={
                    <RefreshControl
                        refreshing={this.props.loading}
                        onRefresh={this.onRefresh.bind(this)}
                        colors={['#202931', 'white']}
                        tintColor='white'
                    />}
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

const styles = {
    bgColor: {
        backgroundColor: '#202931',
        flex: 1,
        paddingTop: 60,
        paddingBottom: 50,
    },
     list: {
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemStyle: {
        margin: 5,
        height: 100,
        width: 100
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

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = ({ achievementsReducer }) => {
    const { achievements, loading, downloading, errorMsg } = achievementsReducer;
    return {
        dataSource: dataSource.cloneWithRows(achievements), 
        loading,
        downloading,
        errorMsg
    };
};

export default connect(mapStateToProps, { 
    downloadAchievements, clearErrorMsg })(AchievementsOverview);
