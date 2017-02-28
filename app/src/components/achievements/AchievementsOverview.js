import React, { Component } from 'react';
import {
    View,
    ListView,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import AchievementItem from './AchievementItem';
import { downloadAchievements } from '../../actions/AchievementsActions';

class AchievementsOverview extends Component {

    componentWillMount() {
        this.props.downloadAchievements();
    }

    onRefresh() {
        this.props.downloadAchievements();
    }

    renderRow(rowData) {
        if (_.isEmpty(rowData)) {
            return <View style={styles.itemStyle} />;
        }
        return <AchievementItem achievement={rowData} />;
    }

    render() {
        return (
            <View style={styles.bgColor}>
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
    }    
};

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = ({ achievementsReducer }) => {
    const { achievements, loading } = achievementsReducer;
    return {
        dataSource: dataSource.cloneWithRows(achievements), 
        loading
    };
};

export default connect(mapStateToProps, { downloadAchievements })(AchievementsOverview);
