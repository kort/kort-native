import React, { Component } from 'react';
import {
    View,
    ListView
} from 'react-native';
import _ from 'lodash';
import AchievementItem from './AchievementItem';

class AchievementsOverview extends Component {

    componentWillMount() {
        const data = require('../../../assets/data/achievements.json');

        //extend data for better UI XP
        const offset = (3 - (data.length % 3)) % 3;
        for (let i = 0; i < offset; ++i) {
            data.push({});
        }

        this.createDataSource(data);       
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }

    createDataSource(data) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.DataSource = ds.cloneWithRows(data);
    }

    renderRow(rowData) {
        console.log(rowData);
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
                    dataSource={this.DataSource}
                    renderRow={this.renderRow}
                    initialListSize={15}
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


export default AchievementsOverview;

