import React, { Component } from 'react';
import {
        ListView,
        RefreshControl
     } from 'react-native';
import { connect } from 'react-redux';
import { downloadHighscore } from '../../actions/HighscoreActions';
import { forceViewUpdateHighscore } from '../../actions/NavigationActions';
import HighscoreListItem from './HighscoreListItem';


class HighscoreList extends Component {
    
     componentWillMount() {
        this.props.downloadHighscore(this.props.currentTab, false);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentTab !== this.props.currentTab) {
            this.props.downloadHighscore(nextProps.currentTab, false);
            this.scrollview.scrollTo({ x: 0, y: 0, animated: true });
        }

        if (nextProps.updateHighscoreView) {
            this.props.downloadHighscore(this.props.currentTab, true);
            this.props.forceViewUpdateHighscore(false);
        }
    }

    onRefresh() {
        this.props.downloadHighscore(this.props.currentTab, true);
    }

    scrollview = null;    

    renderRow(rowData) {
        return <HighscoreListItem data={rowData} />;
    }

    render() {
        return (
            <ListView 
                ref={scrollview => { this.scrollview = scrollview; }}
                contentContainerStyle={styles.list}
                dataSource={this.props.dataSource}
                renderRow={(rowData) => this.renderRow(rowData)}
                initialListSize={10}
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
        paddingBottom: 60,        
    }
};

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = ({ highscoreReducer, navigationReducer }) => {
    const { highscore, loading, currentTab } = highscoreReducer;
    const { updateHighscoreView } = navigationReducer;
    return {
        dataSource: dataSource.cloneWithRows(highscore), 
        loading,
        currentTab,
        updateHighscoreView
    };
};

export default connect(mapStateToProps, { downloadHighscore, forceViewUpdateHighscore })(HighscoreList);
