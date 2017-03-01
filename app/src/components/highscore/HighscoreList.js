import React, { Component } from 'react';
import {
        ListView,
        RefreshControl
     } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { downloadHighscore } from '../../actions/HighscoreActions';
import HighscoreListItem from './HighscoreListItem';


class HighscoreList extends Component {

     componentWillMount() {
         console.log('component load');
        this.props.downloadHighscore();
    }

    onRefresh() {
        this.props.downloadHighscore();
    }

    renderRow(rowData) {
        return <HighscoreListItem data={rowData} />;
    }

    render() {
        return (
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
        );
    }
    
}

const styles = {
    list: {
        flex: 1
    }
};

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = ({ highscoreReducer }) => {
    const { highscore, loading } = highscoreReducer;
    return {
        dataSource: dataSource.cloneWithRows(highscore), 
        loading
    };
};

export default connect(mapStateToProps, { downloadHighscore })(HighscoreList);
