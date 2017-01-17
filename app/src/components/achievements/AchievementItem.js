import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Popup } from '../common/';

class AchievementItem extends Component {

    state = { showModal: false };

    onRowPress() {
        console.log('pressed '+this.props.achievement);
        // Actions.openAchievement({ achievement: this.props.achievement });
        this.setState({ showModal: true });
    }

    onAccept() {
        this.setState({ showModal: false });
    }

    render() {
        const { achievementImageURI, achievementDescription } = this.props.achievement;

        return (  
                <View style={styles.itemStyle}>
                    <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                        <Image
                            style={styles.badgeAchievedStyle}
                            source={{ uri: achievementImageURI }}
                            defaultSource={{ uri: 'placeholderBadge' }}
                        />
                    </TouchableWithoutFeedback>
                    <Popup
                        visible={this.state.showModal}
                        onAccept={this.onAccept.bind(this)}
                        imageURI={achievementImageURI}
                    >
                    {achievementDescription}
                    </Popup>
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
