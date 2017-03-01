import React, { Component } from 'react';
import {
        View,
        Text
     } from 'react-native';

class HighscoreListItem extends Component {


    render() {
        return (
            <View style={styles.itemStyle}>
                <Text>{this.props.data.username}</Text>
            </View>       
        );
    }
    
}

const styles = {
    itemStyle: {
        height: 60,
        backgroundColor: 'white'
    }
};



export default HighscoreListItem;
