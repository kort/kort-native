import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';


class AchievementItem extends Component {

    onRowPress() {
        console.log('pressed '+this.props.achievement);
        // Actions.openAchievement({ achievement: this.props.achievement });
    }

    render() {
        console.log(this.props);
        const { achievementImageURL } = this.props.achievement;
        console.log(this.props.achievement.achievementImageURL);

        return (  
                <View style={styles.itemStyle}>
                    <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                        <Image
                            style={styles.badgeAchievedStyle}
                            source={{ uri: achievementImageURL }}
                            defaultSource={{ uri: 'placeholderBadge' }}
                        />
                    </TouchableWithoutFeedback>
                </View>
        );
    }
}

const styles = {
    itemStyle: {
        backgroundColor: 'transparent',
        margin: 5,
        height: 100,
        width: 100
    },
    badgeAchievedStyle: {
        marginLeft: 10,
        marginTop: 10,
        width: 80,
        height: 80
    }
};

export default AchievementItem;
