import React, { Component } from 'react';
import {
    View,
    ListView,
    Text
} from 'react-native';
import AchievementItem from './AchievementItem';

class AchievementsOverview extends Component {

    componentWillMount() {
        const data = require('../../../assets/data/achievements.json');

        this.createDataSource(data);       
        console.log(data); 
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
        console.log(data);
        this.DataSource = ds.cloneWithRows(data);
    }

    renderRow(rowData) {
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
    }    
};


export default AchievementsOverview;

