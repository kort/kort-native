import React, { Component } from 'react';
import {
        View,
        Text
     } from 'react-native';
import I18n from 'react-native-i18n';

class HighscoreListItem extends Component {


    render() {
        return (
            <View style={styles.itemStyle}>
                <View style={styles.cellStyle}>
                    <View style={styles.rankStyle}>
                        <View style={styles.rankIconStyle}>
                            <Text style={styles.textStyleRank}>{this.props.data.rank}</Text>
                        </View>
                    </View>
                    <View style={styles.userStyle}>
                        <Text style={styles.textStyle}>{this.props.data.username}</Text>
                    </View>
                    <View style={styles.missionStyle}>
                        <Text style={styles.textStyle}>{I18n.t('highscore_missions')}</Text>
                        <Text style={styles.textStyleBold}>{this.props.data.mission_count}</Text>
                    </View>
                    <View style={styles.koinStyle}>
                        <Text style={styles.textStyle}>Koins</Text>
                        <Text style={styles.textStyleBold}>{this.props.data.koin_count}</Text>
                    </View>
                </View>
            </View>       
        );
    }
    
}

const styles = {
    itemStyle: {
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: '#657C8E',
        justifyContent: 'center'
    },
    cellStyle: {
        flex: 1,
        flexDirection: 'row'
    },
    rankStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    userStyle: {
        justifyContent: 'center',
        flex: 2
    },
    missionStyle: {
        justifyContent: 'center',
        flex: 1
    },
    koinStyle: {
        justifyContent: 'center',
        flex: 1,
    },
    textStyle: {
        fontSize: 14,
        color: 'white'
    },
    textStyleRank: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    rankIconStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#395971',
        width: 36,
        height: 36,
        borderRadius: 18,

    },
    textStyleBold: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
};

export default HighscoreListItem;
