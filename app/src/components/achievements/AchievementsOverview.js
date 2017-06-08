import React, { Component } from 'react';
import {
    View,
    ListView,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import I18n from 'react-native-i18n';
import AchievementItem from './AchievementItem';
import { downloadAchievements, clearErrorMsg } from '../../actions/AchievementsActions';
import { forceViewUpdateAchievements } from '../../actions/NavigationActions';
import { Spinner, Popup } from '../common';

class AchievementsOverview extends Component {

    componentWillMount() {
        this.props.downloadAchievements(false, this.props.user.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updateAchievementsView) {
            this.props.downloadAchievements(false, this.props.user.id);
            this.props.forceViewUpdateAchievements(false);
        }
    }

    onAccept() {
        this.props.clearErrorMsg();
    }

    onRefresh() {
        this.props.downloadAchievements(true, this.props.user.id);
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
                    message={I18n.t('error_message_bad_connectivity')}
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

const mapStateToProps = ({ achievementsReducer, authReducer, navigationReducer }) => {
    const { user } = authReducer;
    const { achievements, loading, downloading, errorMsg } = achievementsReducer;
    const { updateAchievementsView } = navigationReducer;

    return {
        dataSource: dataSource.cloneWithRows(achievements), 
        loading,
        downloading,
        errorMsg,
        user,
        updateAchievementsView
    };
};

export default connect(mapStateToProps, { 
    downloadAchievements, clearErrorMsg, forceViewUpdateAchievements })(AchievementsOverview);
